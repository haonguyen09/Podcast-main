import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTeam } from '../../services/TeamService'
import { getDetailsUser } from '../../services/UserService'

const CreateTeamPage = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const token = user.access_token
    const decoded = jwtDecode(token)

    const [name, setName] = useState()
    const [listMember, setListMember] = useState([])
    const [listInvite, setListInvite] = useState(new Set())
    

    useEffect(() => {
        const fetchListMember = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    const memberDetail = await getDetailsUser(decoded?.id)
                    setListMember(memberDetail.data.followingId.followings)
                } catch (error) {
                    console.error(error)
                }
            }
        }
        fetchListMember()
    }, [token])

    const handleInvite = (id) => { 
        setListInvite(prev => {
            const newSet = new Set(prev)
            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                newSet.add(id)
            }
            // console.log("newSet", newSet)
            return newSet
        })
    }

    
    const handleCreate = async () => {
        const data = {
            name: name,
            userId: decoded.id,
            members: Array.from(listInvite)
        }
        const response = createTeam(data)
        if (response) {
            toast.success("Create team successful!")
            navigate('/team')
        } else {
            toast.error("Create team failed!")
        }
    }

    return (
        <div className='createTeam text-start'>
            <h2 className='heading createTeam-heading'>Create new team</h2>
            <div className='createTeam-name'>
                <h4>Name</h4>
                <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className='createTeam-members'>
                <h4>Member</h4>
                <div className='createTeam-avatar-wrap'>
                    {
                        listMember.map((item, index) => (
                            <div className="createTeam-item d-flex justify-content-between align-items-center" key={index}>
                                <div className='createTeam-avatar d-flex align-items-center'>
                                    <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${item.avatar}`} />
                                    <h5>{`${item.firstName}${item.lastName}`}</h5>
                                </div>
                                <button className='button button--primary' onClick={() => handleInvite(item._id)}>
                                    {listInvite.has(item._id) ? 'Uninvite' : 'Invite'}
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <button className='button button--primary width-full' onClick={handleCreate}>Create Team</button>
            </div>
        </div>
    )
}

export default CreateTeamPage
