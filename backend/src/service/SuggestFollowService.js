const SuggestFollow = require('../model/SuggestFollowModel');
const { default: mongoose } = require('mongoose');


const createSuggestFollow = (newSuggestFollow) => {
    // console.log("newSuggestFollow",newSuggestFollow)
    return new Promise(async (resolve, reject) => {
        if (!newSuggestFollow) {
            return reject(new TypeError("New suggestFollow data is required"));
        }

        newSuggestFollow.userId = new mongoose.Types.ObjectId(newSuggestFollow.userId);
        newSuggestFollow.suggestFollows.map(suggestFollow => new mongoose.Types.ObjectId(suggestFollow))

        if (newSuggestFollow) {

            try {
                const response = await SuggestFollow.create(newSuggestFollow)
                if (response) {

                    resolve({
                        status: "OK",
                        message: "Create suggestFollow successful",
                        data: response
                    })
                }
            } catch (error) {
                reject({
                    status: "ERR",
                    message: "Create suggestFollow failed!",
                    error: error
                })
            }
        }
    })
}


const updateSuggestFollow = (id, data) => {
    return new Promise(async (resolve, reject) => {

        const SuggestFollowId = new mongoose.Types.ObjectId(id);

        if (data.suggestFollows && Array.isArray(data.suggestFollows)) {
            data.suggestFollows = data.suggestFollows.map(suggestFollow => new mongoose.Types.ObjectId(suggestFollow));
        }

        if (data.userId) {
            data.userId = new mongoose.Types.ObjectId(data.userId);
        }

        try {

            const response = await SuggestFollow.findByIdAndUpdate(SuggestFollowId, data, { new: true });

            if (response) {
                resolve({
                    status: "OK",
                    message: "Update suggestFollow successful",
                    data: response
                });
            } else {
                reject({
                    status: "ERR",
                    message: "SuggestFollow not found!"
                });
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "Update suggestFollow failed!",
                error: error
            });
        }
    });
};


const getDetailsSuggestFollow  = (id) => {
    return new Promise( async (resolve, reject) => {
    
        const suggestFollowId = new mongoose.Types.ObjectId(id)

        const checkSuggestFollow = await SuggestFollow.findOne({
            _id:suggestFollowId
        })
        if (!checkSuggestFollow) {
            reject({
                status: 'ERR',
                message: 'The suggestFollow not found!'
            })
        }

        try {
            const response = await SuggestFollow.findById(suggestFollowId)
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

const deleteSuggestFollow = (id) => {
    return new Promise(async (resolve, reject) => {
        
        const suggestFollowId = new mongoose.Types.ObjectId(id)

        const checkSuggestFollow = await SuggestFollow.findOne({
            _id:suggestFollowId
        })
        if (!checkSuggestFollow) {
            reject({
                status: 'ERR',
                message: 'The suggestFollow not found!'
            })
        }

        try {
            const response = await SuggestFollow.findByIdAndDelete(suggestFollowId)
            if (response) {
                
                resolve({
                    status: "OK",
                    message: "Delete suggestFollow successful"
                })
            }
        } catch (error) {
            reject({
                status: "ERR",
                message: "delete suggestFollow failed!",
                error: error
            })
        }
    })
}


const getAllSuggestFollow = async (limit = 4, page = 0, filter) => {
        try {
            const totalSuggestFollow = await SuggestFollow.countDocuments()
            const queryConditions = {}
            if (filter) {
                queryConditions[filter[0]] = { '$regex': filter[1], '$options': 'i' };
            }
            const response = await SuggestFollow.find(queryConditions).limit(limit).skip(limit * page)
                                        .populate({ path: "userId" })
            if (response) {
                return{
                    status: "OK",
                    message: "Get all suggestFollow successful",
                    data: response,
                    totals: totalSuggestFollow,
                    page: Number(page) + 1,
                    totalPage: Math.ceil(totalSuggestFollow / limit)
                }
            }
        } catch (e) {
            return({
                status: "ERR",
                message: "get all suggestFollow failed!",
                error: e
            })
        }
}


module.exports = {
    createSuggestFollow,
    updateSuggestFollow,
    getDetailsSuggestFollow,
    deleteSuggestFollow,
    getAllSuggestFollow
}