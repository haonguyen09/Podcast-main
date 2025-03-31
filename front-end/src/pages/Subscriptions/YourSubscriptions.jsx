import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDetailsUser } from '../../services/UserService'

const YourSubscriptions = () => {

    const user = useSelector(state => state.user)
    const token = user?.access_token


    const [listFollowing, setListFollowing] = useState([])

    useEffect(() => {
        const fetchListFollowing = async() => {
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    const userDetail = await getDetailsUser(decoded?.id)
                    // console.log("userDetail", userDetail.data.followingId.followings)
                    setListFollowing(userDetail.data.followingId.followings)
                } catch (error) {
                    console.error(error)
                }
            }
            
        } 

        fetchListFollowing()
    },[token])

    return (
        <div className='yourSub'>
            <div className='yourSub-header text-start'>
                <h2 className='heading yourSub-heading'>Your Subscriptions</h2>
                <span>Hear what the people you follow have posted:</span>
            </div>
            <div className='yourSub-main'>
                <div className='yourSub-list d-flex  justify-content-start align-items-center'>
                    {
                        listFollowing.map((item, index) => (
                            <div className='yourSub-item d-flex flex-column justify-content-center align-items-center' key={index}>
                                <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${item.avatar}`} alt='avatar' />
                                <h3>{`${item.firstName} ${item.lastName}`}</h3>
                                <span>Psychologist (UK)</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default YourSubscriptions
