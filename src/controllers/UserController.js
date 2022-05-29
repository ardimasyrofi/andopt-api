const UserModel = require('../models/UserModel');

const validateUsername = async (username) => {
    const user = await UserModel.findOne({ username });
    if (user) {
        return false;
    }
    return true;
};

const validateEmail = async (email) => {
    const user = await UserModel.findOne({ email });
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
        message: 'test',
        data: user
    }).code(200);
    return response;
};