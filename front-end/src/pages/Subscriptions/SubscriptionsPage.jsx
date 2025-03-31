import React from 'react'
import YourSubscriptions from './YourSubscriptions'
import LastestEpisodesSub from './LastestEpisodesSub'

const SubscriptionsPage = () => {
    return (
        <div className='subscriptions-wrapper'>
            <YourSubscriptions />
            <LastestEpisodesSub/>
        </div>
    )
}

export default SubscriptionsPage
