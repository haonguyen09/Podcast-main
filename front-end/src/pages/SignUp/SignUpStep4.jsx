import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateFollower } from '../../services/FollowerService'
import { updateFollowing } from '../../services/FollowingService'
import { getAllUser, getDetailsUser, updateUser } from '../../services/UserService'
import { getObjectFromLocalStorage } from '../../utils/handleLocalStorage'

const SignUpStep4 = (props) => {
    
    const { currentStep, handleStepChange } = props
    const navigate = useNavigate()
    const [listUser, setListUser] = useState([]); 
    const [userDetails, setUserDetails] = useState([]); 
    const [search, setSearch] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const [followedUsers, setFollowedUsers] = useState(new Set());

    const data = getObjectFromLocalStorage('signUpData')
    useEffect(() => {
        const fetchListUser = async () => {
            setLoading(true)
            try {
                const response = await getAllUser(4, currentPage - 1, search)
                console.log("response", response)
                const filterUser = response.data.filter(item => item._id !== data.id)
                setListUser(filterUser)
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false)
            }
        }

        const fetchIdDetails = async () => {
            const userDetails = await getDetailsUser(data.id)
            console.log("userDetails", userDetails)
            setUserDetails(userDetails.data)
        }

        fetchListUser()
        fetchIdDetails()
    }, [search])

    const debouncedFilterChange = debounce((newFilter) => {
        setSearch(newFilter);
        setCurrentPage(1)
    }, 10);

    const handleSearch = (e) => {
        debouncedFilterChange(e.target.value);
    }
    
    const handleBack = () => {
        handleStepChange(currentStep - 1);
    };

    const handleFinish = async() => {
        navigate('/sign-in');
        const formData = {
            topics: data.topics,
            featuresPodcast: data.featuredPodcast,
        }
        const followedUsersArray = Array.from(followedUsers);
        console.log("followedUsersArray", followedUsersArray)
        await updateUser(data.id, formData)
        await updateFollowing(userDetails.followingId._id, { followings: followedUsersArray })
        followedUsersArray.map(async item => {
            const result = await getDetailsUser(item)
            const existingFollowers = result.data.followerId.followers.map(item => item._id) || [];
            const updatedFollowers = [...existingFollowers, data.id];
            await updateFollower(result.data.followerId._id, {followers: updatedFollowers})
        })
        localStorage.removeItem('signUpData');
    }

    const handleFollow = (userId) => {
        setFollowedUsers((prevFollowedUsers) => {
            const newFollowedUsers = new Set(prevFollowedUsers);
            if (newFollowedUsers.has(userId)) {
                newFollowedUsers.delete(userId);
            } else {
                newFollowedUsers.add(userId);
            }
            console.log("newFollowedUsers", newFollowedUsers)
            return newFollowedUsers;
        });
    };

    console.log("followedUsers", followedUsers)

    return (
        <div className='signUp-s4'>
            <input className='signUp-s4-search' placeholder='Search people' onChange={handleSearch} />
            <div className='signUp-s4-list d-grid'>
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : listUser.map((user, index) => (
                        <div className='signUp-s4-item d-flex align-items-center justify-content-between' key={index}>
                            <div className="signUp-s4-author d-flex align-items-center">
                                <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${user.avatar}`} alt='img' />
                                <div class="signUp-s4-info">
                                    <h5>{`${user.firstName} ${user.lastName}`}</h5>
                                    <span style={{textTransform: "lowercase"}}>{`@${user.firstName}${user.lastName}`}</span>
                                </div>
                            </div>
                            <button 
                                className={`button ${followedUsers.has(user._id) ? "" : "button--primary"}`} 
                                onClick={() => handleFollow(user._id)}
                            >
                                {followedUsers.has(user._id) ? "Followed" : "Follow"}
                            </button>
                        </div>
                    )) 
                }
                
            </div>
            <div className='d-flex justify-content-between align-items-center width-full'>
                <button className='button button--secondary signUp-s4-btn' onClick={handleBack}>Back</button>
                <button className='button button--primary signUp-s4-btn' onClick={handleFinish}>Finish</button>
            </div>
        </div>
    )
}

export default SignUpStep4
