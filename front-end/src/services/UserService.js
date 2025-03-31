import axios from 'axios';

export const axiosJWT = axios.create()

const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/user/login`, data)
    return res.data
}

const refreshToken = async (refreshToken) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/user/refresh-token`, {} , {
        headers: {
            authorization: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API}/user/logout`)
    return res.data
}

const createUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/user/create`, data)
    return res.data
}

const updateUser = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API}/user/update/${id}`, data)
    return res.data
}

const getDetailsUser = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/user/get-details/${id}`)
    return res.data
}

const getAllUser = async (limit, page, search) => {
    let res = {};
    if (search && search.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API}/user/get-all?limit=${limit}&page=${page}&filter=email&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API}/user/get-all?limit=${limit}&page=${page}`)
    }


    return res.data
}

export {
    loginUser,
    logoutUser,
    refreshToken,
    createUser,
    updateUser,
    getDetailsUser,
    getAllUser
}