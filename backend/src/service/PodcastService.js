const Podcast = require('../model/PodcastModel');
const Topic = require('../model/TopicModel');
const Comment = require('../model/CommentModel');
const { default: mongoose } = require('mongoose');
const removeFile = require('../utils/removeFile');

const createPodcast = (newPodcast, files) => {
    return new Promise(async (resolve, reject) => {
        if (!newPodcast) {
            return reject(new TypeError("New podcast data is required"));
        }

        const { title, description, status, topicId, duration, userId } = newPodcast;
        let imagePath, audioPath;

        const existingPodcast = await Podcast.findOne({ title });
        if (existingPodcast) {
            return reject({
                status: "ERR",
                message: "Title already exists!"
            });
        }

        try {
            if (files.image && files.image[0]) {
                imagePath = files.image[0].location; // S3 URL
            }
            if (files.audio && files.audio[0]) {
                audioPath = files.audio[0].location; // S3 URL
            }

            const response = await Podcast.create({
                title,
                description,
                status,
                topicId,
                duration,
                userId,
                image: imagePath,
                audio: audioPath
            });

            const update = {
                $inc: { totalPodcast: 1 },
                $addToSet: { podcasts: response._id }
            };

            await Topic.findByIdAndUpdate(topicId, update, { new: true });

            resolve({
                status: "OK",
                message: "Create podcast successful",
                data: response
            });
        } catch (error) {
            reject({
                status: "ERR",
                message: "Create podcast failed!",
                error: error
            });
        }
    });
};



const updatePodcast = (id, data, files) => {
    return new Promise(async (resolve, reject) => {
        const podcastId = new mongoose.Types.ObjectId(id);

        try {
            const existingPodcast = await Podcast.findById(podcastId);

            if (!existingPodcast) {
                return reject({
                    status: "ERR",
                    message: "Podcast not found!"
                });
            } 

            let imagePath = existingPodcast.image;
            if (files && files.image && files.image[0]) {
                imagePath = files.image[0].location; // S3 URL
            }

            let audioPath = existingPodcast.audio;
            if (files && files.audio && files.audio[0]) {
                audioPath = files.audio[0].location; // S3 URL
            }

            const updateFields = {
                ...data,
                image: imagePath,
                audio: audioPath
            };

            const response = await Podcast.findByIdAndUpdate(podcastId, updateFields, { new: true });

            if (response) {
                resolve({
                    status: "OK",
                    message: "Update podcast successful",
                    data: response
                });
            } else {
                reject({
                    status: "ERR",
                    message: "Podcast not found!"
                });
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "Update podcast failed!",
                error: error
            });
        }
    });
};




const getDetailsPodcast  = (id) => {
    return new Promise( async (resolve, reject) => {

        const podcastId = new mongoose.Types.ObjectId(id)

        const existingPodcast = await Podcast.findOne({
            _id:podcastId
        })
        if (!existingPodcast) {
            reject({
                status: 'ERR',
                message: 'The podcast not found!'
            })
        }

        try {
            const response = await Podcast.findById(podcastId)
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

const deletePodcast = (id) => {
    return new Promise( async (resolve, reject) => {

        const podcastId = new mongoose.Types.ObjectId(id)

        const existingPodcast = await Podcast.findOne({
            _id:podcastId
        })
        if (!existingPodcast) {
            reject({
                status: 'ERR',
                message: 'The podcast not found!'
            })
        }

        try {
            const response = await Podcast.findByIdAndDelete(podcastId)
            if (response) {
                console.log("response", response)
                //Implement remove podcastId in podcasts and update totalPodcast
                const update = {
                    $inc: { totalPodcast: -1 },
                    $pull: { podcasts: podcastId }
                };
        
                await Topic.findByIdAndUpdate(response.topicId, update, { new: true });

                //Implement remove each comment in comments
                response.comments.forEach( async comment => {
                    await Comment.findByIdAndDelete(comment)
                });

                //remove files in uploads
                removeFile(response.image, response.audio)
                

                resolve({
                    status: "OK",
                    message: "Delete podcast successful"
                })
            }
        } catch (error) {
            console.log("errorController", error)
            reject({
                status: "ERR",
                message: "delete podcast failed!",
                error: error
            })
        }
    })
}


const getAllPodcast = async (limit = 4, page = 0, filter) => {
        try {
            const totalPodcast = await Podcast.countDocuments()
            const queryConditions = {}
            if (filter) {
                const [filterKey, filterValue] = filter;
                if (filterKey && filterValue) {
                    if (mongoose.Types.ObjectId.isValid(filterValue)) {
                        queryConditions[filterKey] = filterValue;
                    } else {
                        queryConditions[filterKey] = { '$regex': filterValue, '$options': 'i' };
                    }
                }
            }
            const response = await Podcast.find(queryConditions).limit(limit).skip(limit * page)
                                        .populate({ path: "userId" })
                                        .populate({ path: "topicId" })
                                        .populate({ path: "comments" })
            if (response) {
                return{
                    status: "OK",
                    message: "Get all podcast successful",
                    data: response,
                    totals: totalPodcast,
                    page: Number(page) + 1,
                    totalPage: Math.ceil(totalPodcast / limit)
                }
            }
        } catch (e) {
            console.log('error', e)
            return({
                status: "ERR",
                message: "get all podcast failed!",
                error: e
            })
        }
}


module.exports = {
    createPodcast,
    updatePodcast,
    getDetailsPodcast,
    deletePodcast,
    getAllPodcast
}