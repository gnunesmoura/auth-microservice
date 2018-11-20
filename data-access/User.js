const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  scope: String,
});

module.exports = mongoose.model('User', UserSchema);
