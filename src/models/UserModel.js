const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const UserSchema = new Schema({
    username: String,
    email: String,
    address: String,
});

module.exports = Mongoose.model('user', UserSchema);
