const SuggestFollowService = require('../service/SuggestFollowService')
const { default: mongoose } = require('mongoose');


const createSuggestFollow = async (req, res) => {
    const { userId, suggestFollows } = req.body
    
    try {

        if (!userId) {
            return res.status(404).json({
                status: "ERR",
                message: "All field is required!"
            })
        } 

        if (suggestFollows.every(suggestFollow => mongoose.Types.ObjectId.isValid(suggestFollow))) {
            throw new Error("Invalid user ID format in SuggestFollows");
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID format");
        }

        const response = await SuggestFollowService.createSuggestFollow(req.body)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updateSuggestFollow = async (req, res) => {
    const SuggestFollowId = req.params.id
    const { userId, suggestFollows, ...data} = req.body
    if (!SuggestFollowId || !Array.isArray(suggestFollows)) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields is required!"
        })
    }

    
    if(!mongoose.Types.ObjectId.isValid(SuggestFollowId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid SuggestFollowId!"
        })
    }

    if (!suggestFollows.every(suggestFollow => mongoose.Types.ObjectId.isValid(suggestFollow))) {
        throw new Error("Invalid user ID format in SuggestFollows");
    }

    if(userId && !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid userId!"
        })
    }


    try {
        const updateData = {suggestFollows, ...data}
        const response = await SuggestFollowService.updateSuggestFollow(SuggestFollowId, updateData)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

const getDetailsSuggestFollow = async (req, res) => {
    const SuggestFollowId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(SuggestFollowId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid SuggestFollowId!"
        })
    }

    if (SuggestFollowId) {
        try {
            const response = await SuggestFollowService.getDetailsSuggestFollow(SuggestFollowId)
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
            message: 'The SuggestFollowId is required'
        })
    }
}

const deleteSuggestFollow = async (req, res) => {
    const SuggestFollowId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(SuggestFollowId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid SuggestFollowId!"
        })
    }


    if (SuggestFollowId) {
        try {
            const response = await SuggestFollowService.deleteSuggestFollow(SuggestFollowId)
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
            message: 'The SuggestFollowId is required'
        })
    }
}


const getAllSuggestFollow = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await SuggestFollowService.getAllSuggestFollow(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createSuggestFollow,
    updateSuggestFollow,
    getDetailsSuggestFollow,
    deleteSuggestFollow,
    getAllSuggestFollow
}