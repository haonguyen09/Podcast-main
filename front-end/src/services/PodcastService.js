import axios from 'axios';

export const axiosJWT = axios.create()


const createPodcast = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/podcast/create`, data)
    return res.data
}

const updatePodcast = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API}/podcast/update/${id}`, data)
    return res.data
}

const getAllPodcast = async (limit, page, filter, search) => {
    let res = {};
    if (search && filter && search.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API}/podcast/get-all?limit=${limit}&page=${page}&filter=${filter}&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API}/podcast/get-all?limit=${limit}&page=${page}`)
    }
    console.log('res', limit, page, filter, search)
    return res.data
}


export {
    createPodcast,
    updatePodcast,
    getAllPodcast
}