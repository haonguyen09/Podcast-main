import axios from 'axios';

export const axiosJWT = axios.create()


const createTeam = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/team/create`, data)
    return res.data
}

const updateTeam = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API}/team/update/${id}`, data)
    return res.data
}

const getDetailsTeam = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/team/get-details/${id}`)
    return res.data
}

const getAllTeam = async (limit, page, filter, search) => {
    let res = {};
    if (search && filter && search.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API}/team/get-all?limit=${limit}&page=${page}&filter=${filter}&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API}/team/get-all?limit=${limit}&page=${page}`)
    }
    console.log('res', limit, page, filter, search)
    return res.data
}


export {
    createTeam,
    updateTeam,
    getDetailsTeam,
    getAllTeam
}