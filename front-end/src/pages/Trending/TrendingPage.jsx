import React from 'react'
import TrendingPodcast from './TrendingPodcast'
import TrendingEpisdes from './TrendingEpisdes'

const TrendingPage = () => {
    return (
        <div className='trending-wrapper'>
            <TrendingPodcast />
            <TrendingEpisdes/>
        </div>
    )
}

export default TrendingPage
