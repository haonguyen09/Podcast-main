const CommentService = require('../service/CommentService')
const { default: mongoose } = require('mongoose');


const createComment = async (req, res) => {
    const { content, userId, podcastId } = req.body
    
    try {

        if (!content || !userId || !podcastId) {
            return res.status(404).json({
                status: "ERR",
                message: "All field is required!"
            })
        } 

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({
                status: "ERR",
                message: "Invalid user ID!"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(podcastId)) {
            return res.status(404).json({
                status: "ERR",
                message: "Invalid podcast ID!"
            });
        }

        const response = await CommentService.createComment(req.body)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updateComment = async (req, res) => {
    const commentId = req.params.id
    const { userId, podcastId,...data} = req.body
    if (!commentId || !data) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields is required!"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid comment ID!"
        });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid user ID!"
        });
    }

    if (!mongoose.Types.ObjectId.isValid(podcastId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid podcast ID!"
        });
    }


    try {
        const updateData = {...data}
        const response = await CommentService.updateComment(commentId, updateData)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

const getDetailsComment = async (req, res) => {
    const commentId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({
            status: "ERR",
            message: "commentId is valid!"
        })
    }

    if (userId) {
        try {
            const response = await CommentService.getDetailsComment(commentId)
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
            message: 'The commentId is required'
        })
    }
}

const deleteComment = async (req, res) => {
    const commentId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid commentId!"
        })
    }


    if (commentId) {
        try {
            const response = await CommentService.deleteComment(commentId)
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
            message: 'The commentId is required'
        })
    }
}


const getAllComment = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await CommentService.getAllComment(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createComment,
    updateComment,
    getDetailsComment,
    deleteComment,
    getAllComment
}