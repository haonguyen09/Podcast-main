import React, { useEffect, useState } from 'react'
import FeedItemComponent from '../../components/FeedItemComponent'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { getDetailsUser } from '../../services/UserService'

const LastestEpisodesSub = () => {

    const user = useSelector(state => state.user)
    const token = user?.access_token

    const [listPodcast, setListPodcast] = useState([])



    useEffect(() => {
        const fetchListPodcast = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    const response = await getDetailsUser(decoded?.id)
                    const listTopic = response.data.topics.flatMap(topic => topic.podcasts)
                    console.log("listTopic", listTopic)
                    setListPodcast(listTopic)
                } catch (error) {
                    console.error(error)
                }
            }
        }

        fetchListPodcast()
    }, [token])

    return (
        <div className='lastest-episodes'>
            <div className='lastest-episodes-header'>
                <h2 className='heading lastest-episodes-heading text-start'>Latest Episodes</h2>
            </div>
            <div className='lastest-episodes-main'>
                <div className='lastest-episodes-list d-grid'>
                    {
                        listPodcast.map((podcast, index) => (
                            <div className='lastest-episodes-item' key={index}>
                                <FeedItemComponent data={podcast} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LastestEpisodesSub
