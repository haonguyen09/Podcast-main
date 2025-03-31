const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TeamSchema = new Schema({
  name: {type: String, require: true},
  userId: {type: ObjectId, ref:"User", require: true},
  members: {type: Array, ref: "User", require: false}
}, {versionKey: false, timestamps: true, collection: "Team"});

const Team = mongoose.model('Team', TeamSchema, "Team");

module.exports = Team
