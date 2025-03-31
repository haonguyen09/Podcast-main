import axios from 'axios';

export const axiosJWT = axios.create()


const createPlaylist = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/playlist/create`, data)
    return res.data
}

const updatePlaylist = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API}/playlist/update/${id}`, data)
    return res.data
}

const getAllPlaylist = async (limit, page, filter, search) => {
    let res = {};
    if (search && filter && search.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API}/playlist/get-all?limit=${limit}&page=${page}&filter=${filter}&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API}/playlist/get-all?limit=${limit}&page=${page}`)
    }
    console.log('res', limit, page, filter, search)
    return res.data
}


export {
    createPlaylist,
    updatePlaylist,
    getAllPlaylist
}