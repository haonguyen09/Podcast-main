const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FollowerSchema = new Schema({
    userId: {type: ObjectId, ref:"User", require: true},
    followers: {type: Array, ref: "User", require: false}
}, {versionKey: false, timestamps: true, collection: "Follower"});

const Follower = mongoose.model('Follower', FollowerSchema, "Follower");

module.exports = Follower
