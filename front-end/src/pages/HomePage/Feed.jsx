import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import CheckIcon from '../../asset/icons/CheckIcon';
import RatingIcon from '../../asset/icons/RatingIcon';
import FeedItemComponent from '../../components/FeedItemComponent';
import Toggle from '../../components/Toggle';
import { getDetailsUser } from '../../services/UserService';

const Feed = () => {
    const user = useSelector(state => state.user)
    const token = user?.access_token

    const [listPodcast, setListPodcast] = useState([])



    useEffect(() => {
        const fetchListPodcast = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    const response = await getDetailsUser(decoded?.id)
                    const listTopic = response.data.topics.flatMap(topic => topic.podcasts)
                    console.log("listTopic", listTopic)
                    setListPodcast(listTopic)
                } catch (error) {
                    console.error(error)
                }
            }
        }

        fetchListPodcast()
    }, [token])
    

    const tabs = [{ name: 'My Feed', href: '/my-feed' }, { name: 'Popular', href: '#' }, { name: 'Recent', href: '#' }]

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    
    return (
        <div className='feed'>
            <div className='feed-header d-flex justify-content-between align-items-center'>
                <Nav variant="tabs" defaultActiveKey="/my-feed" className='feed-tab'>
                    {
                        tabs.map((tab, index) => (
                            <Nav.Item key={index} className='feed-tab-item'>
                                <Nav.Link href={ tab.href } className='feed-tab-item-link'>{ tab.name }</Nav.Link>
                            </Nav.Item>
                        ))
                    }
                </Nav>
                <div className='feed-toggle d-flex align-items-center'>
                    <Toggle />
                    <p>New Releases &amp; Guests Only</p>
                </div>
            </div>
            <div className='feed-main'>
                {
                    listPodcast.map((podcast, index) => (
                        <div className='feed-item' key={index}>
                            <div className='feed-item-header d-flex justify-content-between align-items-center'>
                                <div className='feed-author d-flex justify-content-center align-items-center'>
                                    <div className='feed-author-avatar'>
                                        <img src={ `${process.env.REACT_APP_S3_BUCKET_URL}/${podcast.userId.avatar}` } alt='avatar' />
                                        <CheckIcon className='feed-author-verify'/>
                                    </div>
                                    <div className='feed-author-content'>
                                        <div class="feed-author-info d-flex justify-content-end align-items-center">
                                            <h4 className='feed-author-name'>{`${podcast.userId.firstName} ${podcast.userId.lastName}`}</h4>
                                            <div className='feed-author-rating'>
                                                <span>rated an episude</span>
                                                <RatingIcon/>
                                            </div>
                                        </div>
                                        <div className='feed-date text-start'>{formatDate(podcast.createdAt)}</div>
                                    </div>
                                </div>
                                <FontAwesomeIcon icon={faEllipsisV}/>
                            </div>
                            <FeedItemComponent data={podcast} />
                        </div>
                    ))
                }
                {/* <Pagination className='d-flex justify-content-center margin-block-30'>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination> */}
            </div>
        </div>
    )
}

export default Feed
