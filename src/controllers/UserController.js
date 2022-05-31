const { response } = require('@hapi/hapi/lib/validation');
const UserModel = require('../models/UserModel');

// KENDALA :
// 1. username atau email yg masuk belum sensitive pd huruf kapital
// 2. data yg sdh diupadted, belum bisa menampilkan data 

const validateUsername = async (username, id = null) => {
    let user = null;

    if (id) {
        user = await UserModel.findOne({ username, _id: { $ne: id } });
    } else {
        user = await UserModel.findOne({ username });
    }

    if (user) {
        return false;
    }
    return true;
};

const validateEmail = async (email, id = null) => {
    let user = null;
    
    if (id) {
        user = await UserModel.findOne({ email, _id: { $ne: id } });
    } else {
        user = await UserModel.findOne({ email });
    }
    
    if (user) {
        return false;
    }
    return true;
};

exports.addUser = async (request, h) => {
    const reqUser = new UserModel(request.payload);
    const username = reqUser.username.toLowerCase();
    const email = reqUser.email.toLowerCase();
    const address = reqUser.address;

    const user = {
        username,
        email,
        address
    }

    const validationUsername = await validateUsername(username);
    const validationEmail = await validateEmail(email);

    if (!validationUsername || !validationEmail) {
        if (!validationUsername) {
            return h.response({
                message: 'Username already exists',
            }).code(400);
        }
        else if (!validationEmail) {
            return h.response({
                message: 'Email already exists',
            }).code(400);
        }
    }
    
    await user.save();
    return h.response(user).code(201);
};

exports.getAllUsers = async (request, h) => {
    const users = await UserModel.find();
    return h.response(users);
};

exports.getUser = async(request, h) => {
    const user = await UserModel.find({_id: request.params.id}).exec();

    const response = h.response({
        status: 'success',
        message: 'Berhasil!',
        data: user
    }).code(200);
    
    return response;
};

exports.updateUser = async(request, h) => {
    try {
        const checkUser = await UserModel.findOne({_id: request.params.id}).exec();
        if(!checkUser) {
            const response = h.response({
                status: 'fail',
                message: 'Data not found!'
            }).code(404);
            
            return response;
        }
        
        const username = request.payload.username.toLowerCase();
        const email = request.payload.email.toLowerCase();
        const address = request.payload.address;
        
        const validationUsername = await validateUsername(username, request.params.id);
        const validationEmail = await validateEmail(email, request.params.id);

        const user = {
            username,
            email,
            address
        }

        if (!validationUsername || !validationEmail) {
            if (!validationUsername) {
                const response = h.response({
                    message: 'Username already exists',
                }).code(400);

                return response;
            }
            else if (!validationEmail) {
                const response = h.response({
                    message: 'Email already exists',
                }).code(400);

                return response
            }
        }
        await UserModel.updateOne({_id: request.params.id}, {$set: user});
        const updatedUser = await UserModel.findOne({_id: request.params.id}).exec();
        
        const response = h.response({
            status: 'success',
            message: 'Data was updated!',
            data: updatedUser
        }).code(200);
        
        return response;
    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Error!'
        }).code(400);

        return response;
    }
};

exports.deleteUser = async(request, h) => {
    const checkId = await UserModel.find({_id: request.params.id}).exec();
    console.log(checkId)
    if(!checkId) {
        const response = h.response({
            status: 'fail',
            message: 'Data not found!'
        }).code(404);
        
        return response;
    }
    
    try {
        const deletedUser = await UserModel.deleteOne({_id: request.params.id}, {$set: request.payload});
        
        const response = h.response({
            status: 'success',
            message: 'Data was deleted!',
        }).code(200);
        
        return response;
    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Error!'
        }).code(400);

        return response;
    }
};