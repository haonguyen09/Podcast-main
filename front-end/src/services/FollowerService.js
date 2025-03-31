import axios from 'axios';

export const axiosJWT = axios.create()


const createFollower = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/follower/create`, data)
    return res.data
}

const updateFollower = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API}/follower/update/${id}`, data)
    return res.data
}

const getAllFollower = async (limit, page, search) => {
    let res = {};
    if (search.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API}/follower/get-all?limit=${limit}&page=${page}&filter=email&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API}/follower/get-all?limit=${limit}&page=${page}`)
    }


    return res.data
}

export {
    createFollower,
    updateFollower,
    getAllFollower
}