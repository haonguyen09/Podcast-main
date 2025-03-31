const Rate = require('../model/RateModel');
const Podcast = require('../model/PodcastModel');
const { default: mongoose } = require('mongoose');


const createRate = (newRate) => {
    // console.log("newRate",newRate)
    return new Promise(async (resolve, reject) => {
        if (!newRate) {
            return reject(new TypeError("New rate data is required"));
        }

        newRate.userId = new mongoose.Types.ObjectId(newRate.userId);
        newRate.podcastId = new mongoose.Types.ObjectId(newRate.podcastId);

        if (newRate) {

            try {
                const response = await Rate.create(newRate)
                if (response) {
                    const updateUser = {
                        $addToSet: {ratings: response._id}
                    }

                    await Podcast.findByIdAndUpdate(response.podcastId, updateUser, { new: true })
                    resolve({
                        status: "OK",
                        message: "Create rate successful",
                        data: response
                    })
                }
            } catch (error) {
                reject({
                    status: "ERR",
                    message: "Create rate failed!",
                    error: error
                })
            }
        }
    })
}


const updateRate = (id, data) => {
    return new Promise(async (resolve, reject) => {

        const RateId = new mongoose.Types.ObjectId(id);

        if (data.userId) {
            data.userId = new mongoose.Types.ObjectId(data.userId);
        }
        if (data.podcastId) {
            data.podcastId = new mongoose.Types.ObjectId(data.podcastId);
        }

        try {

            const response = await Rate.findByIdAndUpdate(RateId, data, { new: true });

            if (response) {
                resolve({
                    status: "OK",
                    message: "Update rate successful",
                    data: response
                });
            } else {
                reject({
                    status: "ERR",
                    message: "Rate not found!"
                });
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "Update rate failed!",
                error: error
            });
        }
    });
};


const getDetailsRate  = (id) => {
    return new Promise( async (resolve, reject) => {
    
        const rateId = new mongoose.Types.ObjectId(id)

        const checkRate = await Rate.findOne({
            _id:rateId
        })
        if (!checkRate) {
            reject({
                status: 'ERR',
                message: 'The rate not found!'
            })
        }

        try {
            const response = await Rate.findById(rateId)
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

const deleteRate = (id) => {
    return new Promise(async (resolve, reject) => {
        
        const rateId = new mongoose.Types.ObjectId(id)

        const checkRate = await Rate.findOne({
            _id:rateId
        })
        if (!checkRate) {
            reject({
                status: 'ERR',
                message: 'The rate not found!'
            })
        }

        try {
            const response = await Rate.findByIdAndDelete(rateId)
            if (response) {
                
                const updateUser = {
                    $pull: {
                        ratings: rateId
                    }
                }
                await Podcast.findByIdAndUpdate(response.podcastd, updateUser, { new: true })

                resolve({
                    status: "OK",
                    message: "Delete rate successful"
                })
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "delete rate failed!",
                error: error
            })
        }
    })
}


const getAllRate = async (limit = 4, page = 0, filter) => {
        try {
            const totalRate = await Rate.countDocuments()
            const queryConditions = {}
            if (filter) {
                queryConditions[filter[0]] = { '$regex': filter[1], '$options': 'i' };
            }
            const response = await Rate.find(queryConditions).limit(limit).skip(limit * page)
                                        .populate({ path: "podcastId" })
                                        .populate({ path: "userId" })
            if (response) {
                return{
                    status: "OK",
                    message: "Get all rate successful",
                    data: response,
                    totals: totalRate,
                    page: Number(page) + 1,
                    totalPage: Math.ceil(totalRate / limit)
                }
            }
        } catch (e) {
            return({
                status: "ERR",
                message: "get all rate failed!",
                error: e
            })
        }
}


module.exports = {
    createRate,
    updateRate,
    getDetailsRate,
    deleteRate,
    getAllRate
}