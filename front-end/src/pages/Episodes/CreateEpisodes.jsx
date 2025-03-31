import React, { useEffect, useState } from 'react'
import UploadIcon from '../../asset/icons/UploadIcon'
import CheckBoxCustom from '../../components/CheckBoxCustom'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { getAllTopic } from '../../services/TopicService'
import { createPodcast } from '../../services/PodcastService'
import { toast } from 'react-toastify'
import { printFile } from '../../utils/printFile'
import AudioPlayer from 'react-h5-audio-player';

const CreateEpisodes = () => {
    const user = useSelector(state => state.user)
    const token = user?.access_token
    let decoded 

    try {
        decoded = jwtDecode(token)
    } catch (error) {
        console.error(error)
    }

    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [audio, setAudio] = useState(null)
    const [audioPreview, setAudioPreview] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState('draft')
    const [duration, setDuration] = useState(0)
    const [topicId, setTopicId] = useState('');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchListTopic = async () => {
            const response = await getAllTopic()
            setTopics(response.data)
        }

        fetchListTopic()
    }, [decoded])

    const ResetForm = () => {
        setImage(null)
        setAudio(null)
        setTitle("")
        setDescription("")
        setStatus('draft')
        setDuration(0)
        setTopicId("")
        setTopics([])
    }
    
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            printFile(file, setImagePreview)
        } else {
            setImage(null);
        }
    };


    const handleAudio = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setAudio(null);
            setDuration(0);
            return;
        }
        printFile(file, setAudioPreview)

        const fileURL = URL.createObjectURL(file);
        const audioElement = new Audio(fileURL);

        audioElement.onloadedmetadata = () => {
            setAudio(file);
            setDuration(audioElement.duration);
            URL.revokeObjectURL(fileURL); // Clean up
        };

        audioElement.onerror = (error) => {
            console.error("Error loading audio file:", error);
            setAudio(null);
            setDuration(0);
            URL.revokeObjectURL(fileURL); // Clean up in case of error
        };
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data", image, audio, title, description, status, duration, decoded.id, topicId)
        const formData = new FormData();
        formData.append('image', image);
        formData.append('audio', audio);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('status', status);
        formData.append('duration', duration);
        formData.append('topicId', topicId);
        formData.append('userId', decoded.id)
        const response = await createPodcast(formData);
        
        if (response) {
            toast.success("Create podcast successful!")
        } else {
            toast.error("Create podcast failed!")
        }
        ResetForm()
    };


    return (
        <div className='createEpisodes'>
            <h2 className='heading createEpisodes-heading text-start'>Create New Episode</h2>
            <div className='createEpisodes-main text-start'>
                <div className='createEpisodes-thumbnail'>
                    <h4>Episode Thumbnail</h4>
                    <div className='createEpisodes-wrapper'>
                        <label for="createEpisodes-upload" className='createEpisodes-upload-label text-center'>
                            {
                                imagePreview ? <img src={imagePreview} style={{width: '100px'}}/> : 
                                (<><UploadIcon />
                                <h4>Drag and drop or browse to choose a file</h4>
                                <span>PNG, JPG and Gif files are allowed</span></>)
                            }
                        </label>
                        <input type='file' alt='file-image' id='createEpisodes-upload' onChange={handleImage} />
                    </div>
                </div>
                <div className='createEpisodes-thumbnail'>
                    <h4>Audio</h4>
                    <div className='createEpisodes-wrapper'>
                        <label for="createEpisodes-upload-audio" className='createEpisodes-upload-label text-center'>
                            {audioPreview ?
                                <AudioPlayer
                                    autoPlay
                                    src={audioPreview}
                                /> : <>
                                    <UploadIcon />
                                    <h4>Drag and drop or browse to choose a file</h4>
                                    <span>Audio file up to 500mb in mp3 or wav formate</span>
                                </>
                            }
                        </label>
                        <input type='file' alt='file-audio' id='createEpisodes-upload-audio' onChange={handleAudio} />
                    </div>
                </div>
                <div className='createEpisodes-details'>
                    <h4>Episode Details</h4>
                    <div className='createEpisodes-wrapper-title'>
                        <div className='createEpisodes-title'>
                            <h5>Episode title</h5>
                            <input type='text' placeholder='Title of your episode' value={title} onChange={e => setTitle(e.target.value)}/>
                        </div>
                        <div className='createEpisodes-description'>
                            <h5>Description</h5>
                            <textarea rows='4' value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className='createEpisodes-topic'>
                    <h4>Topic</h4>
                    <select className='createEpisodes-topic-select width-full' value={topicId} onChange={e => setTopicId(e.target.value)}>
                        <option value="">Select a topic</option>
                        {topics.map(topic => (
                            <option key={topic._id} value={topic._id}>{topic.name}</option>
                        ))}
                    </select>
                </div>
                <div className='createEpisodes-status-list'>
                    <h4>Release status</h4>
                    <span>Only public episodes are listed in your RSS feed, drafts will never be shown and private episodes are only accessible directly by link for review</span>
                    <div className='createEpisodes-wrapper-status'>
                        <div className='createEpisodes-status d-flex'>
                            <CheckBoxCustom checked={status === 'draft'} onChange={() => setStatus('draft')}/>
                            <div className="createEpisodes-status-wrap">
                                <h6>Draft</h6>
                                <span>Episode is currently in draft stage</span>
                            </div>
                        </div>
                        <div className='createEpisodes-status d-flex'>
                            <CheckBoxCustom checked={status === 'private'} onChange={() => setStatus('private')}/>
                            <div className="createEpisodes-status-wrap">
                                <h6>Private</h6>
                                <span>The episode is not listed and only people with a link can listen</span>
                            </div>
                        </div>
                        <div className='createEpisodes-status d-flex'>
                            <CheckBoxCustom checked={status === 'public'} onChange={() => setStatus('public')} />
                            <div className="createEpisodes-status-wrap">
                                <h6>Public</h6>
                                <span>The episode wouldbe available to evryone</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='button button--primary w-full' onClick={handleSubmit}>Upload</button>
                </div>
            </div>
        </div>
    )
}

export default CreateEpisodes
