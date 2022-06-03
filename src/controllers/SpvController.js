const UserModel = require('../models/UserModel');
const { getAuth } = require('firebase-admin');

// -----------------> POST : ADMIN -----------------> //
exports.registerAdminHandler = async (request, h) => {
    try {
        const { uid } = request.payload;
        const admin = await UserModel.findOne({uid}).exec();
        
        if(!admin) {
            const newAdmin = {
                uid,
                role: 'admin'
            }

            const account = await UserModel.create(newAdmin);

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