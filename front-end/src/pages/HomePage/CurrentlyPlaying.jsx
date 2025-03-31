import React from 'react'
import video from '../../asset/podcasts/3910618-hd_1920_1080_25fps.mp4'

const CurrentlyPlaying = () => {
    return (
        <div className='current-play'>
            <div className='current-play-header d-flex justify-content-between'>
                <h2 className='heading current-play-heading text-start'>Currently Playing</h2>
            </div>
            <div className='current-play-main'>
                <video controls autoplay>
                    <source src={video}  type="video/mp4"/>
                </video>
            </div>
        </div>
    )
}

export default CurrentlyPlaying
