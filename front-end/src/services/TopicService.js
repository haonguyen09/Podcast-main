import axios from 'axios';

export const axiosJWT = axios.create()


const createTopic = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/topic/create`, data)
    return res.data
}

const updateTopic = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/topic/create`, data)
    return res.data
}

const getAllTopic = async (limit, page, search) => {
    let res = {};
    if (search && search.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API}/topic/get-all?limit=${limit}&page=${page}&filter=name&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API}/topic/get-all?limit=${limit}&page=${page}`)
    }
    return res.data
}


export {
    createTopic,
    updateTopic,
    getAllTopic
}