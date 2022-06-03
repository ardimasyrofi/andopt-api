const UserModel = require('../models/UserModel');
const { getAuth } = require('firebase-admin');

// -----------------> GET : DATA USER -----------------> //
exports.getAllUsers = async (request, h) => {
    // Tambahan to other
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

    // const users = await UserModel.find();
    // return h.response(users);
    
    try {
        // const {role} = request.payload;
        if(user.role === 'admin') {
        // if(role === 'admin') {
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

    // const users = await UserModel.findOne({uid: request.params.uid});
    // return h.response(users);

    try {
        // const {role} = request.payload;
        if(user.role === 'admin') {
        // if(role === 'admin') {
            const users = await UserModel.findOne({uid: request.params.uid});
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

