const LikeService = require('../service/LikeService')
const { default: mongoose } = require('mongoose');


const createLike = async (req, res) => {
    const { userId, podcastId } = req.body
    
    try {

        if (!userId || !podcastId) {
            return res.status(404).json({
                status: "ERR",
                message: "All field is required!"
            })
        } 

        if (!mongoose.Types.ObjectId.isValid(podcastId)) {
            throw new Error("Invalid podcast ID format");
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID format");
        }

        const response = await LikeService.createLike(req.body)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updateLike = async (req, res) => {
    const LikeId = req.params.id
    const { userId, podcastId, ...data} = req.body
    if (!LikeId || !podcastId || !userId) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields is required!"
        })
    }

    
    if(!mongoose.Types.ObjectId.isValid(LikeId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid LikeId!"
        })
    }

    if(podcastId && !mongoose.Types.ObjectId.isValid(podcastId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid podcastId!"
        })
    }

    if(userId && !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid userId!"
        })
    }


    try {
        const updateData = {...data}
        const response = await LikeService.updateLike(LikeId, updateData)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

const getDetailsLike = async (req, res) => {
    const LikeId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(LikeId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid LikeId!"
        })
    }

    if (LikeId) {
        try {
            const response = await LikeService.getDetailsLike(LikeId)
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
            message: 'The LikeId is required'
        })
    }
}

const deleteLike = async (req, res) => {
    const LikeId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(LikeId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid LikeId!"
        })
    }


    if (LikeId) {
        try {
            const response = await LikeService.deleteLike(LikeId)
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
            message: 'The LikeId is required'
        })
    }
}


const getAllLike = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await LikeService.getAllLike(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createLike,
    updateLike,
    getDetailsLike,
    deleteLike,
    getAllLike
}