const PetModel = require('../models/PetModel');
const UserModel = require('../models/UserModel');
const { getAuth } = require('firebase-admin');

exports.registerPetHandler = async (request, h) => {
    try {
        const { uid, type, gender, age, address } = request.payload;
        const pet = await PetModel.findOne({uid}).exec();
        
        if(!pet) {
            const newPet = {
                uid,
                type,
                gender, 
                age,
                address,
                role: 'pet'
            }

            const account = await PetModel.create(newPet);

            const response = h.response({
                status: 'success',
                message: 'Data was added!',
                data: account
            }).code(201);
            
            return response;
        } else {
            const response = h.response({
                status: 'fail',
                message: 'Pet already exists!'
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

exports.getAllPets = async (request, h) => {
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

    // const pets = await PetModel.find();
    // return h.response(pets);
    
    try {
        // const {role} = request.payload;
        if(user.role === 'user') {
        // if(role === 'admin') {
            const pets = await PetModel.find();
            return h.response(pets);
        }
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Server Error!'
        }).code(500);

        return response;
    }
};

exports.getPet = async(request, h) => {
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

    // const pets = await PetModel.findOne({uid: request.params.uid});
    // return h.response(pets);

    try {
        // const {role} = request.payload;
        if(user.role === 'user') {
        // if(role === 'admin') {
            const pets = await PetModel.findOne({uid: request.params.uid});
            return h.response(pets);
        }
    } catch (error) {
        const response = h.response({
            status: 'fail',
            message: 'Server Error!'
        }).code(500);

        return response;
    }
};

exports.deletePet = async(request, h) => {
    // let user = null;
    // try {
    //     const {'x-firebase-token': token} = request.headers;
    //     const decodedToken = await getAuth().verifyIdToken(token);
    //     const { uid } = decodedToken;
    //     user = await UserModel.findOne({uid}).exec();
    // } catch (error) {
    //     const response = h.response({
    //         status: 'fail',
    //         message: 'Invalid Token!'
    //     }).code(400);

    //     return response;
    // }

    await PetModel.deleteOne({uid: request.params.uid}, {$set: request.payload});
        
    const response = h.response({
        status: 'success',
        message: 'Data was deleted!',
    }).code(200);

    return response;

    // try {
    //     await PetModel.deleteOne({uid: request.params.uid}, {$set: request.payload});
        
    //     const response = h.response({
    //         status: 'success',
    //         message: 'Data was deleted!',
    //     }).code(200);
        
    //     return response;
    // } catch(error) {
    //     const response = h.response({
    //         status: 'fail',
    //         message: 'Error!'
    //     }).code(400);

    //     return response;
    // }
};