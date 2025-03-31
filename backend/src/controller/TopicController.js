const TopicService = require('../service/TopicService')
const { default: mongoose } = require('mongoose');


const createTopic = async (req, res) => {
    const { name } = req.body
    const files = req.files
    // console.log("data body", req.body)
    // console.log("data file", req.files)
    
    try {

        if (!name) {
            return res.status(404).json({
                status: "ERR",
                message: "All field is required!"
            })
        } 


        const response = await TopicService.createTopic(req.body, files)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updateTopic = async (req, res) => {
    const topicId = req.params.id
    const { ...data } = req.body
    const files = req.files
    if (!topicId || !data) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields is required!"
        })
    }
    
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid topic ID!"
        });
    }

    try {
        const response = await TopicService.updateTopic(topicId, data, files)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

const getDetailsTopic = async (req, res) => {
    const topicId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid topic ID!"
        });
    }

    if (topicId) {
        try {
            const response = await TopicService.getDetailsTopic(topicId)
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
            message: 'The topicId is required'
        })
    }
}

const deleteTopic = async (req, res) => {
    const topicId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid topic ID!"
        });
    }
    if (topicId) {
        try {
            const response = await TopicService.deleteTopic(topicId)
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
            message: 'The podcastId is required'
        })
    }
}


const getAllTopic = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await TopicService.getAllTopic(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createTopic,
    updateTopic,
    getDetailsTopic,
    deleteTopic,
    getAllTopic
}