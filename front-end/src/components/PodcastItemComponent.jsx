import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PauseIcon from '../asset/icons/PauseIcon';
import PlayIcon from '../asset/icons/PlayIcon';
import { remainingTime } from '../utils/remainingTime';

const PodcastItemComponent = (props) => {
    const { audioUrl, classWave, data } = props;

    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const initializeWaveSurfer = () => {
            wavesurferRef.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: 'grey',
                progressColor: 'orange',
                cursorColor: 'transparent',
                barWidth: 2,
                barGap: 2,
                height: 50,
                partialRender: true,
                backend: 'MediaElement', 
                preload: 'metadata'
            });

            wavesurferRef.current.load(audioUrl);

            wavesurferRef.current.on('ready', () => {
                setDuration(wavesurferRef.current.getDuration());
            });

            wavesurferRef.current.on('audioprocess', () => {
                setCurrentTime(wavesurferRef.current.getCurrentTime());
            });

            wavesurferRef.current.on('error', (error) => {
                console.error('WaveSurfer error:', error);
            });

            wavesurferRef.current.on('finish', () => {
                setIsPlaying(false);
            });
        };

        if (audioUrl) {
            initializeWaveSurfer();
        }



    }, [audioUrl]);

    const handlePlayPause = () => {
        if (wavesurferRef.current.isPlaying()) {
            wavesurferRef.current.pause();
            setIsPlaying(false);
        } else {
            wavesurferRef.current.play();
            setIsPlaying(true);
        }
    };

    const formatTime = (time) => {
        if (typeof time !== 'number' || isNaN(time)) {
            console.error('Invalid time value:', time);
            return '0:00';
        }
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="podcastItem-container">
            <div className="podcastItem-header d-flex align-items-center">
                <button onClick={handlePlayPause} className="play-pause-btn">
                    {isPlaying ? <PauseIcon className='podcastItem-pause' /> : <PlayIcon className='podcastItem-play' />}
                </button>
                <div className='podcastItem-info'>
                    <h3>{data.title}</h3>
                    <div className='podcastItem-info-sub d-flex align-items-center'>
                        <span>Perspective Podcast ( Episodes-1)</span>
                        <span>{remainingTime(data.createdAt)}</span>
                    </div>
                </div>
            </div>
            <div className="podcastItem-wave-wrapper d-flex align-items-end">
                <div ref={waveformRef} className={classWave} />
                <span className='podcastItem-time'> {formatTime(currentTime)}</span>
            </div>
        </div>
    );
};

export default PodcastItemComponent;
