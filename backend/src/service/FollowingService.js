const Following = require('../model/FollowingModel');
const { default: mongoose } = require('mongoose');


const createFollowing = (newFollowing) => {
    // console.log("newFollowing",newFollowing)
    return new Promise(async (resolve, reject) => {
        if (!newFollowing) {
            return reject(new TypeError("New following data is required"));
        }

        newFollowing.userId = new mongoose.Types.ObjectId(newFollowing.userId);
        newFollowing.followings.map(following => new mongoose.Types.ObjectId(following))

        if (newFollowing) {

            try {
                const response = await Following.create(newFollowing)
                if (response) {

                    resolve({
                        status: "OK",
                        message: "Create following successful",
                        data: response
                    })
                }
            } catch (error) {
                reject({
                    status: "ERR",
                    message: "Create following failed!",
                    error: error
                })
            }
        }
    })
}


const updateFollowing = (id, data) => {
    return new Promise(async (resolve, reject) => {

        const FollowingId = new mongoose.Types.ObjectId(id);

        if (data.followings && Array.isArray(data.followings)) {
            data.followings = data.followings.map(following => new mongoose.Types.ObjectId(following));
        }

        if (data.userId) {
            data.userId = new mongoose.Types.ObjectId(data.userId);
        }

        try {

            const response = await Following.findByIdAndUpdate(FollowingId, data, { new: true });

            if (response) {
                resolve({
                    status: "OK",
                    message: "Update following successful",
                    data: response
                });
            } else {
                reject({
                    status: "ERR",
                    message: "Following not found!"
                });
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "Update following failed!",
                error: error
            });
        }
    });
};


const getDetailsFollowing  = (id) => {
    return new Promise( async (resolve, reject) => {
    
        const followingId = new mongoose.Types.ObjectId(id)

        const checkFollowing = await Following.findOne({
            _id:followingId
        })
        if (!checkFollowing) {
            reject({
                status: 'ERR',
                message: 'The following not found!'
            })
        }

        try {
            const response = await Following.findById(followingId)
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

const deleteFollowing = (id) => {
    return new Promise(async (resolve, reject) => {
        
        const followingId = new mongoose.Types.ObjectId(id)

        const checkFollowing = await Following.findOne({
            _id:followingId
        })
        if (!checkFollowing) {
            reject({
                status: 'ERR',
                message: 'The following not found!'
            })
        }

        try {
            const response = await Following.findByIdAndDelete(followingId)
            if (response) {
                
                resolve({
                    status: "OK",
                    message: "Delete following successful"
                })
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "delete following failed!",
                error: error
            })
        }
    })
}


const getAllFollowing = async (limit = 4, page = 0, filter) => {
        try {
            const totalFollowing = await Following.countDocuments()
            const queryConditions = {}
            if (filter) {
                queryConditions[filter[0]] = { '$regex': filter[1], '$options': 'i' };
            }
            const response = await Following.find(queryConditions).limit(limit).skip(limit * page)
                                        .populate({ path: "userId" })
            if (response) {
                return{
                    status: "OK",
                    message: "Get all following successful",
                    data: response,
                    totals: totalFollowing,
                    page: Number(page) + 1,
                    totalPage: Math.ceil(totalFollowing / limit)
                }
            }
        } catch (e) {
            return({
                status: "ERR",
                message: "get all following failed!",
                error: e
            })
        }
}


module.exports = {
    createFollowing,
    updateFollowing,
    getDetailsFollowing,
    deleteFollowing,
    getAllFollowing
}