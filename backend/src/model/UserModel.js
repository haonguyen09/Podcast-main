const mongoose = require('mongoose');
const { FOLLOWERS_COUNT, FOLLOWINGS_COUNT } = require('../constant/User_Constant');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  avatar: {type: String, require: false},
  email: {type: String, require: true},
  password: {type: String, require: true},
  occupation: {type: String, require: false},
  role: {type: String, require: true},
  mediaSociety: { type: String, require: false },
  featuredPodcast: { type: String, require: false },
  followerId: {type: ObjectId, ref: "Follower", require: false},
  followersCount: {type: Number, require: false, default: FOLLOWERS_COUNT},
  followingId: {type: ObjectId, ref: "Following", require: false},
  followingsCount: {type: Number, require: false, default: FOLLOWINGS_COUNT},
  suggestFollow: {type: ObjectId, ref: "SuggestFollow", require: false},
  teams: { type: Array, ref: "Team", require: false },
  topics: { type: Array, ref: "Topic", require: false },
  playlists: {type: Array, ref: "Playlist", require: false},
}, {versionKey: false, timestamps: true, collection: "User"});

const User = mongoose.model('User', UserSchema, "User");

module.exports = User
