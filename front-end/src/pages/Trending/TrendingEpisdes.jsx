import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HeartIcon from '../../asset/icons/HeartIcon'
import ShareIcon from '../../asset/icons/ShareIcon'
import WaveForm from '../../components/WaveForm'
import { getAllPodcast } from '../../services/PodcastService'
import { remainingTime } from '../../utils/remainingTime'

const TrendingEpisdes = () => {

    const user = useSelector(state => state.user)
    const token = user?.access_token

    const [listPodcast, setListPodcast] = useState([])
    const [limit, setLimit] = useState(4)
    const [status, setStatus] = useState(false)



    useEffect(() => {
        const fetchListPodcast = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    const response = await getAllPodcast(limit, 0)
                    // console.log("response", response)
                    setListPodcast(response.data)
                    
                } catch (error) {
                    console.error(error)
                }
            }
        }

        fetchListPodcast()
    }, [token, limit])

    const handleGetAll = () => {
        setStatus(!status)
        if (status) {
            setLimit(0)
        } else {
            setLimit(4)
        }
    }


    return (
        <div className='trendingE'>
            <div className='trendingE-header text-start'>
                <h2 className='heading trendingE-heading'>Trending episdes</h2>
                <span>The Most Popula Podcast episodes overall now. Last updated 2 hours ago</span>
            </div>
            <div className='trendingE-main d-grid'>
                {
                    listPodcast.map((podcast, index) => (
                        <div className='trendingE-item d-flex align-items-center' key={index}>
                            <div className='trendingE-img'>
                                <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${podcast.image}`} alt='img'/>
                            </div>
                            <div className='trendingE-info text-start'>
                                <h4>{ podcast.title}</h4>
                                <span>Perspective Podcast </span>
                                <div className='trendingE-played d-flex align-items-center'>
                                    <span>{`${podcast.viewsCount} Played`}</span>
                                    <span>{remainingTime(podcast.createdAt)}</span>
                                </div>
                                <div className='trendingE-author d-flex align-items-center'>
                                    <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${podcast.userId.avatar}`} alt='avatar' />
                                    <div className='trendingE-author-info'>
                                        <h5>{ `${podcast.userId.firstName}${podcast.userId.lastName}`}</h5>
                                        <span className='trendingE-author-name'>@{podcast.userId.firstName.toLowerCase()}{podcast.userId.lastName.toLowerCase()}</span>
                                    </div>
                                </div>
                                <div className='trendingE-action'>
                                    <div className="audio-wrapper d-flex align-items-center justify-content-between">
                                        <WaveForm audioUrl={`${process.env.REACT_APP_S3_BUCKET_URL}/${podcast.audio}`} />
                                        <div className="trendingE-audio-action d-flex align-items-center ">
                                            <ShareIcon />
                                            <HeartIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
                <div class="trendingE-btn-more d-flex justify-content-center align-items-center">
                    <button className='button' onClick={handleGetAll}>
                        <span>Load More</span>
                    </button>
                </div>
        </div>
    )
}

export default TrendingEpisdes