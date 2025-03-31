const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LikeSchema = new Schema({
    podcastId: {type: ObjectId, ref: "Podcast", require: false},
    userId: {type: ObjectId, ref: "User", require: false},
    isLike: {type: Boolean,  require: false, default: false}
}, {versionKey: false, timestamps: true, collection: "Like"});

const Like = mongoose.model('Like', LikeSchema, "Like");

module.exports = Like
