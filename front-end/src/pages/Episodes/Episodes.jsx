import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CloudIcon from '../../asset/icons/CloudIcon'
import EditIcon from '../../asset/icons/EditIcon'
import CheckBoxCustom from '../../components/CheckBoxCustom'
import TableComponent from '../../components/TableComponent'
import { getAllPodcast } from '../../services/PodcastService'

const Episodes = () => {

    const user = useSelector(state => state.user)
    const token = user?.access_token
    const navigate = useNavigate()

    const [listPodcast, setListPodcast] = useState([])
    const [limit, setLimit] = useState(7)
    const [currentPage, setCurrentPage] = useState(1)



    useEffect(() => {
        const fetchListPodcast = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    const response = await getAllPodcast(limit, currentPage-1, "userId", decoded?.id)
                    // console.log("response", response)

                    setListPodcast(response.data)
                    
                } catch (error) {
                    console.error(error)
                }
            }
        }

        fetchListPodcast()
    }, [token, limit])

    const handleUpload = () => {
        navigate('/episodes/create')
    }

    const columns = [
        { header: <CheckBoxCustom/>, accessor: 'id' },
        { header: 'Thumbnail', accessor: 'Thumbnail' },
        { header: 'Name', accessor: 'Name' },
        { header: 'Duration', accessor: 'Duration' },
        { header: 'Audio Status', accessor: 'AudioStatus' },
        { header: 'Publish Date', accessor: 'PublishDate' },
        { header: 'Status', accessor: 'Status' },
        { header: 'Action', accessor: 'Action' },
        ];

    const data = listPodcast.map(podcast => (
            {
                id: <input type="checkbox" />,
                Thumbnail: <img src={`${process.env.REACT_APP_S3_BUCKET_URL}/${podcast.image}`} className="episodes-img d-flex" alt="Thumbnail" />,
                Name: (
                <>
                    <h3 className="episodes-title text-start">{podcast.title}</h3>
                    <span className="episodes-sub text-start d-block">Rich Roll Podcast</span>
                </>
                ),
                Duration: podcast.duration,
                AudioStatus: 'Done',
                PublishDate: new Date(podcast.createdAt).toLocaleString(),
                Status: <button className="button button--secondary">{podcast.status}</button>,
                Action: <EditIcon />,
            }))

    return (
        <div className='episodes'>
            <div className='episodes-header d-flex justify-content-between align-items-center'>
                <h2 className='heading episodes-heading text-start'>Episodes</h2>
                <button className='button button--secondary button-episodes' onClick={handleUpload}>
                    <CloudIcon />
                    <span>Upload New Episodes</span>
                </button>
            </div>
            <TableComponent columns={columns} data={ data } />
        </div>
    )
}

export default Episodes
