const PlaylistService = require('../service/PlaylistService')
const { default: mongoose } = require('mongoose');


const createPlaylist = async (req, res) => {
    const { title, description, userId, podcasts } = req.body
    console.log("files controller", req.files)
    const files = req.files
    try {

        if (!title || !description || !userId || !Array.isArray(podcasts)) {
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

        if (!podcasts.every(podcast => mongoose.Types.ObjectId.isValid(podcast))) {
            throw new Error("Invalid podcast ID format in podcasts");
        }

        const response = await PlaylistService.createPlaylist(req.body, files)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updatePlaylist = async (req, res) => {
    const playlistId = req.params.id;
    const { userId, podcasts, ...data } = req.body;
    const files = req.files;
    
    if (!playlistId || !data) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields are required!"
        });
    }

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid playlist ID!"
        });
    }

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid user ID!"
        });
    }

    if (podcasts && !podcasts.every(podcast => mongoose.Types.ObjectId.isValid(podcast))) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid podcast ID format in podcasts!"
        });
    }

    try {
        const updateData = { ...data, podcasts: podcasts };
        const response = await PlaylistService.updatePlaylist(playlistId, updateData, files);
        if (response) {
            return res.status(200).json(response);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "ERR",
            message: "Update playlist failed!",
            error: error.message
        });
    }
};


const getDetailsPlaylist = async (req, res) => {
    const playlistId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(playlistId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid playlistId!"
        })
    }

    if (playlistId) {
        try {
            const response = await PlaylistService.getDetailsPlaylist(playlistId)
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
            message: 'The playlistId is required'
        })
    }
}

const deletePlaylist = async (req, res) => {
    const playlistId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(playlistId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid playlistId!"
        })
    }


    if (playlistId) {
        try {
            const response = await PlaylistService.deletePlaylist(playlistId)
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
            message: 'The playlistId is required'
        })
    }
}


const getAllPlaylist = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await PlaylistService.getAllPlaylist(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createPlaylist,
    updatePlaylist,
    getDetailsPlaylist,
    deletePlaylist,
    getAllPlaylist
}