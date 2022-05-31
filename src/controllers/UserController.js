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
    const user = new UserModel(request.payload);
    const validationUsername = await validateUsername(user.username);
    const validationEmail = await validateEmail(user.email);

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
        // KENDALA TIDAK BISA MENAMPILKAN DATA YG SDH DI UPDATE
    try {
        const checkUser = await UserModel.findOne({_id: request.params.id}).exec();
        console.log(checkUser)
        if(!checkUser) {
            const response = h.response({
                status: 'fail',
                message: 'Data not found!'
            }).code(404);
            
            return response;
        }
        
        const user = new UserModel(request.payload);
        const validationUsername = await validateUsername(user.username, request.params.id);
        const validationEmail = await validateEmail(user.email, request.params.id);

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
        await UserModel.updateOne({_id: request.params.id}, {$set: request.payload});
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