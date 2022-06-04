const UserModel = require('../models/UserModel');
const { getAuth } = require('firebase-admin');

// -----------------> GET : DATA USER -----------------> //
exports.getAllUsers = async (request, h) => {
    // Tambahan to other
    let admin = null;
    try {
        const {'x-firebase-token': token} = request.headers;
        const decodedToken = await getAuth().verifyIdToken(token);
        const { uid } = decodedToken;
        admin = await AdminModel.findOne({uid}).exec();
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
    let admin = null;
    try {
        const {'x-firebase-token': token} = request.headers;
        const decodedToken = await getAuth().verifyIdToken(token);
        const { uid } = decodedToken;
        admin = await AdminModel.findOne({uid}).exec();
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Invalid Token!'
        }).code(400);

        return response;
    }

    // const user = await UserModel.findOne({uid: request.params.uid});
    // return h.response(user);

    try {
        // const {role} = request.payload;
        if(user.role === 'admin') {
        // if(role === 'admin') {
            const user = await UserModel.findOne({uid: request.params.uid});
            return h.response(user);
        }
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Server Error!'
        }).code(500);

        return response;
    }
};

