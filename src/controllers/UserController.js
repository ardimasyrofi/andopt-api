const { response } = require('@hapi/hapi/lib/validation');
const UserModel = require('../models/UserModel');
const Bcrypt = require('bcrypt');

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

exports.loginHandler = async(request, h) => {
    try {
        const { username, password } = request.payload;
        const lowerUsername = username.toLowerCase();
        const user = await UserModel.findOne({username: lowerUsername}).exec();

        if (!user) {
            const response = h.response({
                status: 'fail',
                message: 'Username not found!'
            }).code(404);
            
            return response;
        }

        if (!Bcrypt.compareSync(password, user.password)) {
            const response = h.response({
                status: 'fail',
                message: 'Password is incorrect!'
            }).code(404);
            
            return response;
        }

        request.cookieAuth.set({ id: user._id });

        const response = h.response({
            status: 'success',
            message: 'Login success!'
        }).code(200);
        
        return response;
    } catch(error) {
        const response = h.response({
            status: 'fail',
            message: 'Error!'
        }).code(400);

        return response;
    }
}

exports.registerHandler = async (request, h) => {
    try {
        const { username, email, password, confirmPassword } = request.payload;

        if (password !== confirmPassword) {
            return h.response({
                statusCode: 400,
                error: 'Password dan konfirmasi password tidak sama',
            }).code(400);
        }

        const lowerUsername = username.toLowerCase();
        const lowerEmail = email.toLowerCase();
        const validationUsername = await validateUsername(lowerUsername);
        const validationEmail = await validateEmail(lowerEmail);

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
        const account = await UserModel.create(user);

        if (!account) {
            const response = h.response({
                status: 'fail',
                message: 'Error!'
            }).code(400);

            return response;
        }

        request.cookieAuth.set({ id: account._id });

        const response = h.response({
            status: 'success',
            message: 'Data was added!',
            data: account
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