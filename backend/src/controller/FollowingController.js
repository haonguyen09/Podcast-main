const FollowingService = require('../service/FollowingService')
const { default: mongoose } = require('mongoose');


const createFollowing = async (req, res) => {
    const { userId, followings } = req.body
    
    try {

        if (!userId) {
            return res.status(404).json({
                status: "ERR",
                message: "All field is required!"
            })
        } 

        if (followings.every(following => mongoose.Types.ObjectId.isValid(following))) {
            throw new Error("Invalid user ID format in Followings");
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID format");
        }

        const response = await FollowingService.createFollowing(req.body)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updateFollowing = async (req, res) => {
    const FollowingId = req.params.id
    const { userId, followings, ...data} = req.body
    if (!FollowingId || !Array.isArray(followings)) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields is required!"
        })
    }

    
    if(!mongoose.Types.ObjectId.isValid(FollowingId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid FollowingId!"
        })
    }

    if (!followings.every(following => mongoose.Types.ObjectId.isValid(following))) {
        throw new Error("Invalid user ID format in Followings");
    }

    if(userId && !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid userId!"
        })
    }


    try {
        const updateData = {followings, ...data}
        const response = await FollowingService.updateFollowing(FollowingId, updateData)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

const getDetailsFollowing = async (req, res) => {
    const FollowingId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(FollowingId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid FollowingId!"
        })
    }

    if (FollowingId) {
        try {
            const response = await FollowingService.getDetailsFollowing(FollowingId)
            if (response) {
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(404).json({
                message: e
            })
        }
    } else {
        return res.status(404).json({
            status: 'ERR',
            message: 'The FollowingId is required'
        })
    }
}

const deleteFollowing = async (req, res) => {
    const FollowingId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(FollowingId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid FollowingId!"
        })
    }


    if (FollowingId) {
        try {
            const response = await FollowingService.deleteFollowing(FollowingId)
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
            message: 'The FollowingId is required'
        })
    }
}


const getAllFollowing = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await FollowingService.getAllFollowing(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createFollowing,
    updateFollowing,
    getDetailsFollowing,
    deleteFollowing,
    getAllFollowing
}