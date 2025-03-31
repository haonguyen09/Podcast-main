import axios from 'axios';

export const axiosJWT = axios.create()


const createRate = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/rate/create`, data)
    return res.data
}

const updateRate = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API}/rate/update/${id}`, data)
    return res.data
}

const getAllRate = async (limit, page, filter, search) => {
    let res = {};
    if (search && filter && search.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API}/rate/get-all?limit=${limit}&page=${page}&filter=${filter}&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API}/rate/get-all?limit=${limit}&page=${page}`)
    }
    console.log('res', limit, page, filter, search)
    return res.data
}


export {
    createRate,
    updateRate,
    getAllRate
}