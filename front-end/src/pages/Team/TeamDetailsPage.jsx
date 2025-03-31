import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import TeamCreateIcon from '../../asset/icons/TeamCreateIcon';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import TableComponent from '../../components/TableComponent';
import { getDetailsTeam, updateTeam } from '../../services/TeamService';
import { getDetailsUser } from '../../services/UserService';

const TeamDetailsPage = () => {
    const location = useLocation();
    const dataTeam = location.state.item;
    const user = useSelector(state => state.user);
    const token = user.access_token;
    
    const [showModal, setShowModal] = useState(false);
    const [listMember, setListMember] = useState([]);
    const [listInvite, setListInvite] = useState(new Set());
    const [memberId, setMemberId] = useState("");
    const [teamData, setTeamData] = useState(dataTeam); // State for the team data

    

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const fetchListMember = async () => {
            try {
                console.log("teamData", teamData.members)
                const decoded = jwtDecode(token);
                const memberDetail = await getDetailsUser(decoded?.id);
                const existingMemberIds = new Set(teamData.members.map(member => member._id));
                const listFollowing = memberDetail.data.followingId.followings.filter(item => !existingMemberIds.has(item._id));
                setListMember(listFollowing);
            } catch (error) {
                console.error(error);
            }
        };

        fetchListMember();
    }, [token, teamData.members]);

    const fetchUpdatedTeamData = async () => {
        try {
            const response = await getDetailsTeam(dataTeam._id); // Adjust this according to your service
            if (response) {
                setTeamData(response.data); // Update the state with the new team data
            }
        } catch (error) {
            console.error("Error fetching updated team data:", error);
        }
    };

    const handleInvite = (id, event) => {
        event.preventDefault();
        setListInvite(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleInviteSubmit = async () => {
        const newMembers = Array.from(listInvite);
        const existingMemberIds = teamData.members.map(member => member._id);
        const updatedMemberIds = [...existingMemberIds, ...newMembers];
        
        const data = { members: updatedMemberIds };

        try {
            const response = await updateTeam(dataTeam._id, data);
            if (response) {
                toast.success("Invite member successful!");
                await fetchUpdatedTeamData(); // Fetch and update team data
                setShowModal(false);
            } else {
                toast.error("Invite member failed!");
            }
        } catch (error) {
            toast.error("Invite member failed!");
            console.error(error);
        }
    };

    const handleRemove = async (id) => {
        const updatedMembers = teamData.members.filter(member => member._id !== id).map(member => member._id);

        try {
            const response = await updateTeam(dataTeam._id, { members: updatedMembers });
            if (response) {
                toast.success("Remove member successful!");
                await fetchUpdatedTeamData(); // Fetch and update team data
            } else {
                toast.error("Remove member failed!");
            }
        } catch (error) {
            toast.error("Remove member failed!");
            console.error(error);
        }
    };

    const columns = [
        { header: <CheckBoxCustom/>, accessor: 'id' },
        { header: 'Email', accessor: 'Email' },
        { header: 'Role', accessor: 'Role' },
        { header: 'Date', accessor: 'Date' },
        { header: 'Status', accessor: 'Status' },
        { header: 'Action', accessor: 'Action' },
    ];

    const data = teamData.members.map((member) => ({
        id: <input type="checkbox" value={memberId} onChange={() => setMemberId(member._id)}/>,
        Email: <h6>{member.email}</h6>,
        Role: member.role,
        Date: new Date(member.createdAt).toLocaleString(),
        Status: 'Can’t Resend yet',
        Action: <button className="button button--orange" onClick={() => handleRemove(member._id)}>Remove invite</button>,
    }));

    return (
        <>
            <div className='team-header d-flex justify-content-between align-items-center'>
                <h2 className='heading team-heading text-start'>Members</h2>
                <button className='button button--secondary button-team' onClick={handleShowModal}>
                    <TeamCreateIcon/>
                    <span>Invite member</span>
                </button>
            </div>
            <TableComponent columns={columns} data={data} />
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formInviteEmail">
                            <Form.Label>Member</Form.Label>
                            {listMember.map((item, index) => (
                                <div className="createTeam-item d-flex justify-content-between align-items-center" key={index}>
                                    <div className='createTeam-avatar d-flex align-items-center'>
                                        <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${item.avatar}`} alt="avatar" />
                                        <h5>{`${item.firstName} ${item.lastName}`}</h5>
                                    </div>
                                    <button 
                                        type="button"
                                        className='button button--primary' 
                                        onClick={(event) => handleInvite(item._id, event)}>
                                        {listInvite.has(item._id) ? 'Uninvite' : 'Invite'}
                                    </button>
                                </div>
                            ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleInviteSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TeamDetailsPage;
