import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation } from 'react-router-dom';
import HeartIcon from '../../asset/icons/HeartIcon';
import PlayIcon from '../../asset/icons/PlayIcon';
import PlaylistIcon from '../../asset/icons/PlaylistIcon';
import StarIcon from '../../asset/icons/StarIcon';
import PodcastItemComponent from '../../components/PodcastItemComponent';
import SortPodcast from './SortPodcast';

const PodcastTopic = () => {

    const location = useLocation()
    const data = location.state.topic.podcasts
    console.log("data", data)

    return (
        <div className='exploreItem'>
            <Breadcrumb>
                <Breadcrumb.Item href="/explore-topics">explore-topics</Breadcrumb.Item>
                <Breadcrumb.Item active>religion</Breadcrumb.Item>
            </Breadcrumb>
            <div className='exploreItem-header text-start'>
                <h2 className='heading exploreItem-heading'>Popular Religion & Spirituality podcast episodes</h2>
                <span>Most listend to podcast</span>
            </div>
            <div className='exploreItem-main d-grid'>
                <div className='exploreItem-list'>
                    {
                        data.map((item, index) => (
                            <div className='exploreItem-item d-flex align-items-center justify-content-between' key={index}>
                                <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${item.image}`} alt='podcast' />
                                <div className='exploreItem-action'>
                                    <PodcastItemComponent
                                        audioUrl={`${process.env.REACT_APP_S3_BUCKET_URL}/${item.audio}`}
                                        classWave='podcastItem-wave' 
                                        data={item}
                                        />
                                    <div className='exploreItem-action-item d-flex align-items-center justify-content-between'>
                                        <div className='exploreItem-action-left d-flex align-items-center'>
                                            <HeartIcon />
                                            <StarIcon className='exploreItem-stars'/>
                                            <PlaylistIcon/>
                                        </div>
                                        <div className='exploreItem-action-right'>
                                            <PlayIcon />
                                            <span>{item.viewsCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <SortPodcast/>
            </div>
        </div>
    )
}

export default PodcastTopic
