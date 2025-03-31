import React, { useEffect, useState } from 'react'
import PlusIcon from '../../asset/icons/PlusIcon'
import { getAllPodcast } from '../../services/PodcastService'
import { getObjectFromLocalStorage, updateObjectInLocalStorage } from '../../utils/handleLocalStorage'

const SignUpStep3 = (props) => {

    const { currentStep, handleStepChange } = props
    const [listPodcast, setListPodcast] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPodcast, setSelectedPodcast] = useState(() => {
        // Initialize from localStorage if available
        const savedPodcasts = getObjectFromLocalStorage('signUpData')
        
        try {
            return savedPodcasts ? savedPodcasts.featuresPodcast : null;
        } catch (error) {
            console.error('Error parsing localStorage data: ', error);
            return null;
        }
    })

    useEffect(() => {
        const fetchListPodcast = async() => {

            setLoading(true)
            try {
                const Topics = getObjectFromLocalStorage('signUpData');
                console.log("Topics", Topics.topics)
                const responses = await Promise.all(
                    Topics.topics.map(topic => getAllPodcast(2, 0, 'topicId', topic))
                );

                const allData = responses.flatMap(response => response.data);
                const uniqueData = Array.from(new Set(allData.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
                setListPodcast(uniqueData)
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false)
            }
        } 

        

    fetchListPodcast()
    }, [props])

    
    const handleNext = () => {
        handleStepChange(currentStep + 1);
    };

    const handleBack = () => {
        handleStepChange(currentStep - 1);
    }

    const handlePlusClick = (id, status) => {
        let newSelectedPodcast = null;
        if (status) {
            newSelectedPodcast = id;
        }
        setSelectedPodcast(newSelectedPodcast);

        updateObjectInLocalStorage('signUpData', { featuresPodcast: newSelectedPodcast });
    };


    return (
        <div className='signUp-s3'>
            <input className='signUp-s3-search' placeholder='Search Podcast' />
            <div className='signUp-s3-list d-grid'>
                {loading ? (
                        <p>Loading...</p>
                    ) : listPodcast.map((podcast) => (
                    <div className='signUp-s3-item' key={podcast._id}>
                        <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${podcast.image}`} alt='img' />
                        <PlusIcon
                            className='signUp-s3-item-plus'
                            id={podcast._id}
                            onPlus={handlePlusClick}
                            initialStatus={selectedPodcast === podcast._id}
                        />
                    </div>
                ))}
            </div>
            <div className='d-flex justify-content-between align-items-center width-full'>
                <button className='button button--secondary signUp-s3-btn' onClick={handleBack}>Back</button>
                <button className='button button--primary signUp-s3-btn' onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}

export default SignUpStep3
