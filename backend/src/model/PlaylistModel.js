const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PlaylistSchema = new Schema({
    title: {type: String, require: false},
    description: {type: String, require: false},
    image: {type: String, require: false},
    podcasts: {type: Array, ref: "Podcast", require: false},
    userId: {type: ObjectId, ref: "User", require: false},
}, {versionKey: false, timestamps: true, collection: "Playlist"});

const Playlist = mongoose.model('Playlist', PlaylistSchema, "Playlist");

module.exports = Playlist
