import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import TableComponent from '../../components/TableComponent';
import { updateFollower } from '../../services/FollowerService';
import { getDetailsUser } from '../../services/UserService';

const SubcribersPage = () => {
    const user = useSelector(state => state.user)
    const token = user.access_token
    let decoded

    const [listFollower, setListFollower] = useState([])
    const [followingId, setFollowingId] = useState("")
    const [listFollowing, setListFollowing] = useState("")

    useEffect(() => {
        const fetchFollower = async () => {
            decoded = jwtDecode(token)
            const response = await getDetailsUser(decoded?.id)
            // console.log("response", response)
            setListFollower(response.data.followerId.followers)
            setFollowingId(response.data.followingId._id)
            setListFollowing(response.data.followingId.followings.map(item => item._id))
        }

        fetchFollower()
    }, [token])

    const handleFollow = async (id) => {
        const updateFollowing = [...listFollowing, id]
        await updateFollowing(followingId, {followings: updateFollowing});
        const result = await getDetailsUser(id)
        const existingFollowers = result.data.followerId.followers.map(item => item._id) || [];
        const updatedFollowers = [...existingFollowers, decoded.id];
        await updateFollower(result.data.followerId._id, {followers: updatedFollowers})
    }


    const columns = [
        { header: <CheckBoxCustom/>, accessor: 'id' },
        { header: 'Name', accessor: 'Name' },
        { header: 'Email', accessor: 'Email' },
        { header: 'Badge', accessor: 'Badge' },
        { header: 'Karma', accessor: 'Karma' },
        { header: 'Action', accessor: 'Action' },
        ];

    const data = listFollower.map(item => ({
            id: <input type="checkbox" />,
            Name: (
            <div className='d-flex align-items-center'>
                <img className="subscribers-img" src={`${process.env.REACT_APP_S3_BUCKET_URL}/${item.avatar}`} alt='img' />
                <h3 className="subscribers-title text-start">{`${item.firstName}${item.lastName}`}</h3>
            </div>
            ),
            Email: 'haonguyen09450@gmail.com',
            Badge: <button className='button button--pink'>Producer</button>,
            Karma: '23',
            Action: <button className="button button--orangebg" onClick={() => handleFollow(item._id)}>{listFollowing.includes(item._id) ? 'Followed' : 'Follow'}</button>,
        })) 

    return (
        <div className='subscribers'>
            <div className='subscribers-header d-flex justify-content-between align-items-center'>
                <h2 className='heading subscribers-heading text-start'>subscribers</h2>
            </div>
            <TableComponent columns={columns} data={ data } />
        </div>
    )
}

export default SubcribersPage
