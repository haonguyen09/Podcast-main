import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BronzeMedal from '../../asset/icons/BronzeMedal';
import MedalIcon from '../../asset/icons/MedalIcon';
import MessageIcon from '../../asset/icons/MessageIcon';
import SilverMedal from '../../asset/icons/SilverMedal';
import StartFullIcon from '../../asset/icons/StartFullIcon';
import ViewIcon from '../../asset/icons/ViewIcon';
import TableComponent from '../../components/TableComponent';
import { updateFollower } from '../../services/FollowerService';
import { getAllPodcast } from '../../services/PodcastService';
import { getDetailsUser } from '../../services/UserService';

const LeaderboardPage = () => {
    const user = useSelector(state => state.user)
    const token = user?.access_token
    const decoded = token ? jwtDecode(token) : null;

    const [listUser, setListUser] = useState([])
    const [followingIds, setFollowingIds] = useState([])

    useEffect(() => {
        
        const fetchListUser = async () => {
            const response = await getAllPodcast()
            const sort = response.data.sort((a, b) => b.ratingCount - a.ratingCount)
            // console.log("response", sort.slice(0, 6))
            setListUser(sort.slice(0, 6))
        }
        fetchListUser()
    }, [token, decoded?.id])


    const handleFollow = async (id) => {
        const userCurrent = await getDetailsUser(decoded?.id)
        console.log("userCurrent", userCurrent)
        const existingFollowings = userCurrent.data.followingId.followings.map(item => item._id) || [];
        setFollowingIds(existingFollowings)
        const updateFollowing = [...existingFollowings, id]
        await updateFollowing(userCurrent.data.followingId._id, updateFollowing);
        const result = await getDetailsUser(id)
        const existingFollowers = result.data.followerId.followers.map(item => item._id) || [];
        const updatedFollowers = [...existingFollowers, decoded.id];
        await updateFollower(result.data.followerId._id, {followers: updatedFollowers})
    }

    const columns = [
        { header: '#', accessor: 'id' },
        { header: 'Name', accessor: 'Name' },
        { header: 'Comments', accessor: 'Comments' },
        { header: 'Rating', accessor: 'Rating' },
        { header: 'Views', accessor: 'Views' },
        { header: 'Action', accessor: 'Action' },
        ];

    const data = listUser.map((item, index) => {
        let id;
        if (index === 0) {
            id = <MedalIcon />;
        } else if (index === 1) {
            id = <SilverMedal/>
        } else if (index === 2) {
            id = <BronzeMedal/>
        } else {
            id = index + 1;
        }

        return {
            id: id,
            Name: <div className='d-flex align-items-center'>
                    <img className="leader-img" src={`${process.env.REACT_APP_S3_BUCKET_URL}/${item.userId.avatar}`} alt='img' />
                    <div class="leader-avatar-info  text-start">
                        <h3 className="leader-title">{`${item.userId.firstName}${item.userId.lastName}`}</h3>
                        <span>{item.userId.role}</span>
                    </div>
                </div>,
            Comments: <div className='d-flex align-items-center'>
                        <MessageIcon/>
                        <span className='leader-number'>0</span>
                    </div>,
            Rating: <div className='d-flex align-items-center'>
                        <StartFullIcon/>
                        <span className='leader-number'>{item.ratingCount}</span>
                    </div>,
            Views: <div className='d-flex align-items-center'>
                        <ViewIcon/>
                        <span className='leader-number'>{item.viewsCount}</span>
                    </div>,
            Action: <button className="button button--orangebg" onClick={() => handleFollow(item.userId._id)}>{followingIds.includes(item.userId.__id)?"Followed":"Follow"}</button>,
        }

        })
    

    return (
        <div className='team'>
            <div className='team-header d-flex justify-content-between align-items-center'>
                <h2 className='heading team-heading text-start'>Leaderboard</h2>
            </div>
            <TableComponent columns={columns} data={ data } />
        </div>
    )
}


export default LeaderboardPage
