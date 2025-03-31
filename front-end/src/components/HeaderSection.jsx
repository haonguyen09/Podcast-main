import React from 'react'

const HeaderSection = () => {
    return (
        <div className='topPodcast-header d-flex justify-content-between'>
            <h2 className='heading topPodcast-heading text-start'>Top 8 Podcast</h2>
            <div className='topPodcast-view d-flex align-items-center justify-content-center'>
                <span className='view'>View All</span>
                {/* <ArrowIcon/> */}
            </div>
        </div>
    )
}

export default HeaderSection
