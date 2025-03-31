import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import HeartIcon from '../../asset/icons/HeartIcon'
import PlayIcon from '../../asset/icons/PlayIcon'
import PlaylistIcon from '../../asset/icons/PlaylistIcon'
import StarIcon from '../../asset/icons/StarIcon'
import PodcastItemComponent from '../../components/PodcastItemComponent'

const PLayListShow = () => {

    const location = useLocation()
    const data = location.state
    console.log("data", data)

    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [audioEnded, setAudioEnded] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioEnded) {
            handleNextAudio();
            setAudioEnded(false);
        }
    }, [audioEnded]);

    const handleAudioItemClick = (index) => {
        setCurrentAudioIndex(index); 
        setIsPlaying(true); 
    };

    const handleAudioEnded = () => {
        setAudioEnded(true); 
    };

    const handleNextAudio = () => {
        if (currentAudioIndex < data.length - 1) {
            setCurrentAudioIndex(currentAudioIndex + 1); 
            setIsPlaying(true); 
        } else {
            setIsPlaying(false); 
        }
    };


    return (
        <div className='playlistShow'>
        <div className='playlist-header text-start'>
            <h2 className='heading playlist-heading'>Playlist</h2>
            <span>Hear your own playlists and the playlists you’ve liked</span>
        </div>
        <div className='playlistShow-list d-grid'>
            <div className='playlistShow-item d-flex align-items-center'>
                <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${data[currentAudioIndex].image}`} alt='img' />
                <div className='playlistShow-info'>
                        <PodcastItemComponent audioUrl={`${process.env.REACT_APP_S3_BUCKET_URL}/${data[currentAudioIndex].audio}`} classWave='playlistShow-width' data={ data[currentAudioIndex] } />
                        <div className='playlistShow-listPodcast d-grid'>
                            {
                                data.map((item, index) => (
                                    <div className='playlistShow-itemPodcast d-flex align-items-center justify-content-between' style={{cursor: "pointer"}} key={index} onClick={() => handleAudioItemClick(index)}>
                                        <div className='playlistShow-itemPodcast-info d-flex align-items-center'>
                                            <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${item.image}`} alt='img' />
                                            <h4>{item.title}</h4>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <PlayIcon />
                                            <span>{item.viewsCount}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='playlistShow-footer d-flex align-items-center justify-content-between'>
                            <button className='button'>View 100+ Episodes</button>
                            <div className='exploreItem-action-left d-flex align-items-center'>
                                <HeartIcon />
                                <StarIcon className='exploreItem-stars'/>
                                <PlaylistIcon/>
                            </div>
                        </div>
                </div>
            </div>
            </div>
            <audio ref={audioRef} src={`${process.env.REACT_APP_S3_BUCKET_URL}/${data[currentAudioIndex].audio}`} onEnded={handleAudioEnded} />
    </div>
    )
}

export default PLayListShow
