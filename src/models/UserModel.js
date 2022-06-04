const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const UserSchema = new Schema({
    uid: String,
    address: Array,
    role: String,
});

module.exports = Mongoose.model('user', UserSchema);