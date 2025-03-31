const Like = require('../model/LikeModel');
const Podcast = require('../model/PodcastModel');
const { default: mongoose } = require('mongoose');


const createLike = (newLike) => {
    // console.log("newLike",newLike)
    return new Promise(async (resolve, reject) => {
        if (!newLike) {
            return reject(new TypeError("New like data is required"));
        }

        newLike.userId = new mongoose.Types.ObjectId(newLike.userId);
        newLike.podcastId = new mongoose.Types.ObjectId(newLike.podcastId);

        if (newLike) {

            try {
                const response = await Like.create(newLike)
                if (response) {
                    const updateUser = {
                        $addToSet: {likes: response._id}
                    }

                    await Podcast.findByIdAndUpdate(response.podcastId, updateUser, { new: true })
                    resolve({
                        status: "OK",
                        message: "Create like successful",
                        data: response
                    })
                }
            } catch (error) {
                reject({
                    status: "ERR",
                    message: "Create like failed!",
                    error: error
                })
            }
        }
    })
}


const updateLike = (id, data) => {
    return new Promise(async (resolve, reject) => {

        const LikeId = new mongoose.Types.ObjectId(id);

        if (data.userId) {
            data.userId = new mongoose.Types.ObjectId(data.userId);
        }
        if (data.podcastId) {
            data.podcastId = new mongoose.Types.ObjectId(data.podcastId);
        }

        try {

            const response = await Like.findByIdAndUpdate(LikeId, data, { new: true });

            if (response) {
                resolve({
                    status: "OK",
                    message: "Update like successful",
                    data: response
                });
            } else {
                reject({
                    status: "ERR",
                    message: "Like not found!"
                });
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "Update like failed!",
                error: error
            });
        }
    });
};


const getDetailsLike  = (id) => {
    return new Promise( async (resolve, reject) => {
    
        const likeId = new mongoose.Types.ObjectId(id)

        const checkLike = await Like.findOne({
            _id:likeId
        })
        if (!checkLike) {
            reject({
                status: 'ERR',
                message: 'The like not found!'
            })
        }

        try {
            const response = await Like.findById(likeId)
            if (response) {
                resolve({
                    status: "OK",
                    message: "Get details successful!",
                    data: response
                })
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "Get details failed!",
                error: error
            })
        }
    })
}

const deleteLike = (id) => {
    return new Promise(async (resolve, reject) => {
        
        const likeId = new mongoose.Types.ObjectId(id)

        const checkLike = await Like.findOne({
            _id:likeId
        })
        if (!checkLike) {
            reject({
                status: 'ERR',
                message: 'The like not found!'
            })
        }

        try {
            const response = await Like.findByIdAndDelete(likeId)
            if (response) {
                
                const updateUser = {
                    $pull: {
                        likes: likeId
                    }
                }
                await Podcast.findByIdAndUpdate(response.podcastId, updateUser, { new: true })

                resolve({
                    status: "OK",
                    message: "Delete like successful"
                })
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "delete like failed!",
                error: error
            })
        }
    })
}


const getAllLike = async (limit = 4, page = 0, filter) => {
        try {
            const totalLike = await Like.countDocuments()
            const queryConditions = {}
            if (filter) {
                queryConditions[filter[0]] = { '$regex': filter[1], '$options': 'i' };
            }
            const response = await Like.find(queryConditions).limit(limit).skip(limit * page)
                                        .populate({ path: "podcastId" })
                                        .populate({ path: "userId" })
            if (response) {
                return{
                    status: "OK",
                    message: "Get all like successful",
                    data: response,
                    totals: totalLike,
                    page: Number(page) + 1,
                    totalPage: Math.ceil(totalLike / limit)
                }
            }
        } catch (e) {
            return({
                status: "ERR",
                message: "get all like failed!",
                error: e
            })
        }
}


module.exports = {
    createLike,
    updateLike,
    getDetailsLike,
    deleteLike,
    getAllLike
}