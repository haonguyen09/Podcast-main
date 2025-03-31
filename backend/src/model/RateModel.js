const mongoose = require('mongoose');
const { RATING_MIN, RATING_MAX, RATING_DEFAULT } = require('../constant/Rate_Constant');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RateSchema = new Schema({
    podcastId: {type: ObjectId, ref: "Podcast", require: false},
    userId: { type: ObjectId, ref: "User", require: false },
    isRating: {type: Boolean,  require: false, default: false},
    Rating: {type: Number,  require: false, min: RATING_MIN, max: RATING_MAX, default: RATING_DEFAULT}
}, {versionKey: false, timestamps: true, collection: "Rate"});

const Rate = mongoose.model('Rate', RateSchema, "Rate");

module.exports = Rate
