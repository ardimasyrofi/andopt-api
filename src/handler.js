//import nanoid from package
const users = require('./users'); 
const hapiMongodb = require('hapi-mongodb');
var nanoid = require('nanoid');
const mongoose = require('mongoose');
// const admin = require('./administrators'); 
// const spv = require('./supervisors'); 

// -------------------------------------> USER <------------------------------------- //
// -----------------------------------> Profile <------------------------------------ //

var user = new mongoose.Schema({
    username: String,
    email: String,
    address: String,
});

const userCollection = mongoose.model('user', user);
// utk method POST for Register
const addUserProfileHandler = (request, h) => {
    // statement
    
};

// utk method GET
const getAllDataUserProfileHandler = async(req, h) => ({
    // statement
    // const userOne = await userCollection.find().exec();
    // // console.log(userOne)

    // const response = h.response({
    //     status: 'success',
    //     message: 'test user',
    //     data: userOne
    // }).code(200);

    // return response;
});

// GET dengan ID
const getUserProfileByIdHandler = (request, h) => {
    // statement
};

// Edit for Sunting Profile 
const editUserProfileByIdHandler = (request, h) => {
    // statement
};

// -------------------------------------> USER <------------------------------------- //
// ---------------------------------> Animal Post <---------------------------------- //

// utk method POST
const addAnimalPostHandler = (request, h) => {
    // statement
};

// utk method GET
const getAllAnimalPostHandler = () => ({
    // statement
});

// GET dengan ID User
const getAnimalPostByIdUserHandler = (request, h) => {
    // statement
};

// Mengubah 
const editAnimalPostByIdUserHandler = (request, h) => {
    // statement
};

// DELETE
const deleteAnimalPostByIdUserHandler = (request, h) => {
    // statement
};

// -------------------------------------> USER <------------------------------------- //
// -------------------------------------> Chat <------------------------------------- //



// -------------------------------------> ADMIN <------------------------------------- //
// ---------------------------------> Article Post <---------------------------------- //

// utk method POST for Register Admin
const addArticleHandler = (request, h) => {
    // statement
};

// utk method GET
const getAllArticleHandler = () => ({
    // statement
});

// GET dengan ID
const getArticleByIdAdminHandler = (request, h) => {
    // statement
};

// Mengubah 
const editArticleByIdAdminHandler = (request, h) => {
    // statement
};

// DELETE
const deleteArticleByIdAdminHandler = (request, h) => {
    // statement
};

// -------------------------------> SUPERVISOR (SPV) <-------------------------------- //
// --------------------------------> Register Admin <--------------------------------- //

// utk method POST for Register Admin
const addAdminProfileHandler = (request, h) => {
    // statement
};

// utk method GET
const getAllAdminProfileHandler = () => ({
    // statement
});

// GET dengan ID
const getAdminProfileByIdSpvHandler = (request, h) => {
    // statement
};

// Mengubah 
const editAdminProfileByIdSpvHandler = (request, h) => {
    // statement
};

module.exports = { 
    getAllDataUserProfileHandler, 
};

/*
getAllUserProfileHandler, 
getUserProfileByIdHandler, 
editUserProfileByIdHandler,
addAnimalPostHandler,
getAllAnimalPostHandler,
getAnimalPostByIdUserHandler,
editAnimalPostByIdUserHandler,
deleteAnimalPostByIdUserHandler,
addArticleHandler, 
getAllArticleHandler, 
getArticleByIdAdminHandler, 
editArticleByIdAdminHandler,
deleteArticleByIdAdminHandler,
addAdminProfileHandler,
getAllAdminProfileHandler,
getAdminProfileByIdSpvHandler,
editAdminProfileByIdSpvHandler
*/