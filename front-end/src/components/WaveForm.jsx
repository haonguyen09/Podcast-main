import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PauseIcon from '../asset/icons/PauseIcon';
import PlayIcon from '../asset/icons/PlayIcon';

const Waveform = ({ audioUrl }) => {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        // Destroy previous instance if it exists
        // if (wavesurferRef.current) {
        //     wavesurferRef.current.destroy();
        // }

        // Initialize WaveSurfer
        wavesurferRef.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'grey',
            progressColor: 'orange',
            cursorColor: 'transparent',
            barWidth: 2,
            barGap: 2,
            height: 30,
            backend: 'MediaElement', 
            preload: 'metadata'
        });

        wavesurferRef.current.load(audioUrl);

        // Update duration when audio is ready
        wavesurferRef.current.on('ready', () => {
            setDuration(wavesurferRef.current.getDuration());
        });

        wavesurferRef.current.on('error', (err) => {
            console.error("Wavesurfer error:", err);
        });

        // Update time while playing
        wavesurferRef.current.on('audioprocess', () => {
            setCurrentTime(wavesurferRef.current.getCurrentTime());
        });

        // Update time when user seeks
        wavesurferRef.current.on('seek', () => {
            setCurrentTime(wavesurferRef.current.getCurrentTime());
        });

        // return () => {
        //     if (wavesurferRef.current) {
        //         wavesurferRef.current.destroy();
        //     }
        // };
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
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="waveform-container d-flex align-items-center">
            <button onClick={handlePlayPause} className="play-pause-btn">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div ref={waveformRef} className="waveform" />
            <span className="waveform-time">{formatTime(currentTime)} / {formatTime(duration)}</span>
        </div>
    );
};

export default Waveform;
