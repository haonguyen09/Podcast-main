const TeamService = require('../service/TeamService')
const { default: mongoose } = require('mongoose');


const createTeam = async (req, res) => {
    const { name, userId, members } = req.body
    
    try {

        if (!name || !userId || !Array.isArray(members)) {
            return res.status(404).json({
                status: "ERR",
                message: "All field is required!"
            })
        } 

        if (!members.every(member => mongoose.Types.ObjectId.isValid(member))) {
            throw new Error("Invalid user ID format in members");
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID format");
        }

        const response = await TeamService.createTeam(req.body)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updateTeam = async (req, res) => {
    const teamId = req.params.id
    const { userId, members, name, ...data} = req.body
    if (!teamId || !Array.isArray(members)) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields is required!"
        })
    }

    
    if(!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid teamId!"
        })
    }

    if (!members.every(member => mongoose.Types.ObjectId.isValid(member))) {
        throw new Error("Invalid user ID format in members");
    }

    if(userId && !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid userId!"
        })
    }


    try {
        const updateData = { members, ...data };
        const response = await TeamService.updateTeam(teamId, updateData)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

const getDetailsTeam = async (req, res) => {
    const teamId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid teamId!"
        })
    }

    if (teamId) {
        try {
            const response = await TeamService.getDetailsTeam(teamId)
            if (response) {
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    } else {
        return res.status(404).json({
            status: 'ERR',
            message: 'The teamId is required'
        })
    }
}

const deleteTeam = async (req, res) => {
    const teamId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid teamId"
        })
    }


    if (teamId) {
        try {
            const response = await TeamService.deleteTeam(teamId)
            if (response) {
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    } else {
        return res.status(404).json({
            status: 'ERR',
            message: 'The teamId is required'
        })
    }
}


const getAllTeam = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await TeamService.getAllTeam(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createTeam,
    updateTeam,
    getDetailsTeam,
    deleteTeam,
    getAllTeam
}