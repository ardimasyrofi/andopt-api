const { response } = require('@hapi/hapi/lib/validation');
const AdminModel = require('../models/AdminModel');
const UserModel = require('../models/UserModel');


exports.addAdmin = async (request, h) => {

};

// Admin bisa melihat akun semua user
exports.getAllUsers = async (request, h) => {
    const users = await UserModel.find();
    return h.response(users);
};

exports.getAdmin = async(request, h) => {
    
};

exports.updateAdmin = async(request, h) => {
    
};

// Admin yg bs menghapus akun user
exports.deleteUser = async(request, h) => {
    const checkId = await UserModel.find({_id: request.params.id}).exec();
    console.log(checkId)
    if(!checkId) {
        const response = h.response({
            status: 'fail',
            message: 'Data not find!'
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