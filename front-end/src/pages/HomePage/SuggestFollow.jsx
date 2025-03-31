import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ArrowIcon from '../../asset/icons/ArrowIcon'
import avatar from '../../asset/images/podcast1.webp'
import { updateFollower } from '../../services/FollowerService'
import { updateFollowing } from '../../services/FollowingService'
import { getDetailsUser } from '../../services/UserService'

const SuggestFollow = () => {

    const user = useSelector(state => state.user)
    const token = user?.access_token
    let decoded

    const [listSuggestFollow, setListSuggestFollow] = useState([])
    const [followingId, setFollowingId] = useState("")
    const [followerId, setFollowerId] = useState("")
    const [followingIds, setFollowingIds] = useState(new Set())
    const [status, setStatus] = useState(false)



    useEffect(() => {
        const fetchListPodcast = async () => {
            if (token) {
                try {
                    decoded = jwtDecode(token)
                    const response = await getDetailsUser(decoded?.id)
                    console.log("responseSuggest", response.data)
                    setFollowingId(response.data.followingId._id)
                    setFollowerId(response.data.followerId._id)
                    const suggestFollow = response.data.suggestFollow.suggestFollows
                    const followingId = response.data.followingId.followings

                    const combinedList = [...suggestFollow, ...followingId]
                    setListSuggestFollow(combinedList)
                    setFollowingIds(new Set(followingId.map(following => following._id)))
                } catch (error) {
                    console.error(error)
                }
            }
        }

        fetchListPodcast()
    }, [token])

    const handleFollowToggle = async (userId) => {
        try {
            const updatedFollowingIds = new Set(followingIds);
            if (followingIds.has(userId)) {
                updatedFollowingIds.delete(userId);
            } else {
                updatedFollowingIds.add(userId);
            }
            await updateFollowing(followingId, Array.from(updatedFollowingIds));
            const result = await getDetailsUser(userId)
            const existingFollowers = result.data.followerId.followers.map(item=> item._id) || [];
            const updatedFollowers = [...existingFollowers, decoded.id];
            await updateFollower(result.data.followerId._id, {followers: updatedFollowers})
            setFollowingIds(updatedFollowingIds);
        } catch (error) {
            console.error('Failed to update follow status:', error);
        }
    };

    return (
        <div className='suggest-follow'>
            <div className='suggest-follow-header d-flex justify-content-between'>
                <h2 className='heading suggest-follow-heading text-start'>Suggest Follows</h2>
                <div className='suggest-follow-view d-flex align-items-center justify-content-center'>
                    <span className='view'>View All</span>
                    <ArrowIcon/>
                </div>
            </div>
            <div className='suggest-follow-main'>
                <ul className='suggest-follow-list'>
                {listSuggestFollow.map((user) => (
                        <li key={user._id} className='suggest-follow-item'>
                            <a href='#' className='d-flex justify-content-between align-items-center'>
                                <div className='suggest-follow-author d-flex'>
                                    <img src={user.avatar ? `${process.env.REACT_APP_S3_BUCKET_URL}/${user.avatar}` : avatar} />
                                    <div className='suggest-follow-author-info'>
                                        <h3>{user.firstName} {user.lastName}</h3>
                                        <span>@{user.firstName.toLowerCase()}{user.lastName.toLowerCase()}</span>
                                    </div>
                                </div>
                                <button
                                    className={`button button-follow ${followingIds.has(user._id) ? '' : 'button--primary'}`}
                                    onClick={() => handleFollowToggle(user._id)}
                                >
                                    {followingIds.has(user._id) ? 'Followed' : 'Follow'}
                                </button>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SuggestFollow
