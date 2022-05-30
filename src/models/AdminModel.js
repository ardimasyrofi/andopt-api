const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const AdminSchema = new Schema({
    username: String,
    email: String,
    address: String,
});

module.exports = Mongoose.model('admin', AdminSchema);
