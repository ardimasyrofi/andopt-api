const UserModel = require('../models/UserModel');
const { getAuth } = require('firebase-admin');

// KENDALA :
// 1. username atau email yg masuk belum sensitive pd huruf kapital
// 2. data yg sdh diupadted, belum bisa menampilkan data 

exports.registerHandler = async (request, h) => {
    try {
        const { uid, address } = request.payload;
        const user = await UserModel.findOne({uid}).exec();
        
        if(!user) {
            const newUser = {
                uid,
                address,
                role: 'user'
            }

            const account = await UserModel.create(newUser);

            const response = h.response({
                status: 'success',
                message: 'Data was added!',
                data: account
            }).code(201);
            
            return response;
        } else {
            const response = h.response({
                status: 'fail',
                message: 'User already exists!'
            }).code(400);

            return response;
        }
    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Server Error!'
        }).code(500);

        return response;
    }
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
        
        const { username, email, password} = request.payload;
        const lowerUsername = username.toLowerCase();
        const lowerEmail = email.toLowerCase();
        
        const validationUsername = await validateUsername(lowerUsername, request.params.id);
        const validationEmail = await validateEmail(lowerEmail, request.params.id);

        const user = {
            username: lowerUsername,
            email: lowerEmail,
            password: Bcrypt.hashSync(password, 10)
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

exports.getAllUsers = async (request, h) => {
    let user = null;
    try {
        const {'x-firebase-token': token} = request.headers;
        const decodedToken = await getAuth().verifyIdToken(token);
        const { uid } = decodedToken;
        user = await UserModel.findOne({uid}).exec();
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid Token!'
        }).code(400);

        return response;
    }
    
    try {
        if(user.role === 'admin') {
            const users = await UserModel.find();
            return h.response(users);
        }
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Server Error!'
        }).code(500);

        return response;
    }
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

