const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SuggestFollowSchema = new Schema({
    userId: {type: ObjectId, ref:"User", require: true},
    suggestFollows: {type: Array, ref: "User", require: false}
}, {versionKey: false, timestamps: true, collection: "SuggestFollow"});

const SuggestFollow = mongoose.model('SuggestFollow', SuggestFollowSchema, "SuggestFollow");

module.exports = SuggestFollow
