const RateService = require('../service/RateService')
const { default: mongoose } = require('mongoose');


const createRate = async (req, res) => {
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

        const response = await RateService.createRate(req.body)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updateRate = async (req, res) => {
    const RateId = req.params.id
    const { userId, podcastId, ...data} = req.body
    if (!RateId || !podcastId || !userId) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields is required!"
        })
    }

    
    if(!mongoose.Types.ObjectId.isValid(RateId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid RateId!"
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
        const response = await RateService.updateRate(RateId, updateData)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

const getDetailsRate = async (req, res) => {
    const RateId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(RateId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid RateId!"
        })
    }

    if (RateId) {
        try {
            const response = await RateService.getDetailsRate(RateId)
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
            message: 'The RateId is required'
        })
    }
}

const deleteRate = async (req, res) => {
    const RateId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(RateId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid RateId!"
        })
    }


    if (RateId) {
        try {
            const response = await RateService.deleteRate(RateId)
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
            message: 'The RateId is required'
        })
    }
}


const getAllRate = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await RateService.getAllRate(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createRate,
    updateRate,
    getDetailsRate,
    deleteRate,
    getAllRate
}