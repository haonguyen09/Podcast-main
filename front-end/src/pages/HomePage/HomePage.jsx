import React from 'react'
import Popular from './Popular'
import Trending from './Trending'
import Feed from './Feed'
import TopPodcast from './TopPodcast'
import SuggestFollow from './SuggestFollow'
import ListeningHistory from './ListeningHistory'
import Topics from './Topics'
import CurrentlyPlaying from './CurrentlyPlaying'

const HomePage = () => {
    return (
        <div className="home-wrapper d-grid">
            <div className='home-left'>
                <Popular />
                <Trending />
                <Feed/>
            </div>
            <div className='home-right'>
                <TopPodcast />
                <SuggestFollow />
                <ListeningHistory />
                <Topics />
                <CurrentlyPlaying />
            </div>
        </div>
    )
}

export default HomePage