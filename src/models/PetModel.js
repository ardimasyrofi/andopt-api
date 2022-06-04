const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const PetSchema = new Schema({
    uidPet: String,
    type: String,
    gender: String,
    age: Number,
    address: Array,
    role: String,
});
// name: String,
// desc: String,

module.exports = Mongoose.model('pet', PetSchema);