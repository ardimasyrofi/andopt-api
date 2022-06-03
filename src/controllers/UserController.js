const UserModel = require('../models/UserModel');
const { getAuth } = require('firebase-admin');

const validateUid = async (uid, id = null) => {
    let user = null;

    if (id) {
        user = await UserModel.findOne({ uid, _id: { $ne: id } });
    } else {
        user = await UserModel.findOne({ uid });
    }

    if (user) {
        return false;
    }
    return true;
};

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

// FAILED
exports.updateUser = async(request, h) => {
    // Tambahan to other
    // let user = null;
    // try {
    //     const {'x-firebase-token': token} = request.headers;
    //     const decodedToken = await getAuth().verifyIdToken(token);
    //     const { uid } = decodedToken;
    //     user = await UserModel.findOne({uid}).exec();
    //     console.log(user)
    // } catch (error) {
    //     const response = h.response({
    //         status: 'fail',
    //         message: 'Invalid Token!'
    //     }).code(400);

    //     return response;
    // }

    try {
        const { uid, address } = request.payload;
        
        const lowerUid = uid.toLowerCase();
        const validationUid = await validateUid(lowerUid, request.params.uid);

        const user = {
            uid: lowerUid,
            address: address,
            role: 'user'
        }

        await UserModel.updateOne({uid: request.params.uid}, {$set: user});
        const updatedUser = await UserModel.findOne({uid: request.params.uid}).exec();
        
        if(!updatedUser) {
            const response = h.response({
                status: 'success',
                message: 'Data was updated!',
                data: updatedUser
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

exports.deleteUser = async(request, h) => {
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
        await UserModel.deleteOne({uid: request.params.uid}, {$set: request.payload});
        
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



