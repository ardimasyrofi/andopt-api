const verifyUser = require('../middlewares/verifyUser');

exports.getAllUsers = async (request, h) => {
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const users = await db.collection('users').get();
        const response = h.response({
            status: 'success',
            message: 'All Users retrieved successfully',
            users: users.docs.map(doc => {
                return {
                    id: doc.uid,
                    ...doc.data()
                }  
            })
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

//Search By Username & Role
exports.searchUser = async (request, h) => {
    const { username, role } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try{
        const result = await db.collection('users').get();
        const users = [];
        result.docs.forEach(doc => {
            const nameUser = doc.data().username.toLowerCase();
            const usernameLoweredCase = username.toLowerCase();
            const roleUser = doc.data().role.toLowerCase();
            const RoleLoweredCase = role.toLowerCase();
            if(nameUser.includes(usernameLoweredCase)&&roleUser.includes(RoleLoweredCase)){
                users.push({
                    uid: doc.uid,
                    ...doc.data()
                });
            }
        });

        const response = h.response({
            status: 'success',
            message: 'User searched successfully',
            users
        }).code(200);
        return response;
    }catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

//Search By Username
exports.searchUserByUsername = async (request, h) => {
    const { username } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try{
        const result = await db.collection('users').get();
        const users = [];
        result.docs.forEach(doc => {
            const nameUser = doc.data().username.toLowerCase();
            const usernameLoweredCase = username.toLowerCase();
            if(nameUser.includes(usernameLoweredCase)){
                users.push({
                    uid: doc.uid,
                    ...doc.data()
                });
            }
        });

        const response = h.response({
            status: 'success',
            message: 'User searched successfully',
            users
        }).code(200);
        return response;
    }catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

//Search User by Role
exports.searchUserByRole = async (request, h) => {
    const { role } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try{
        const result = await db.collection('users').get();
        const users = [];
        result.docs.forEach(doc => {
            const roleUser = doc.data().role.toLowerCase();
            const RoleLoweredCase = role.toLowerCase();
            if(roleUser.includes(RoleLoweredCase)){
                users.push({
                    uid: doc.uid,
                    ...doc.data()
                });
            }
        });

        const response = h.response({
            status: 'success',
            message: 'User searched successfully',
            users
        }).code(200);
        return response;
    }catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};


// const UserModel = require('../models/UserModel');
// const { getAuth } = require('firebase-admin');

// // -----------------> GET : DATA USER -----------------> //
// exports.getAllUsers = async (request, h) => {
//     // Tambahan to other
//     let admin = null;
//     try {
//         const {'x-firebase-token': token} = request.headers;
//         const decodedToken = await getAuth().verifyIdToken(token);
//         const { uid } = decodedToken;
//         admin = await AdminModel.findOne({uid}).exec();
//     } catch (error) {
//         const response = h.response({
//             status: 'fail',
//             message: 'Invalid Token!'
//         }).code(400);

//         return response;
//     }

//     // const users = await UserModel.find();
//     // return h.response(users);
    
//     try {
//         // const {role} = request.payload;
//         if(user.role === 'admin') {
//         // if(role === 'admin') {
//             const users = await UserModel.find();
//             return h.response(users);
//         }
//     } catch (error) {
//         const response = h.response({
//             status: 'fail',
//             message: 'Server Error!'
//         }).code(500);

//         return response;
//     }
// };

// exports.getUser = async(request, h) => {
//     let admin = null;
//     try {
//         const {'x-firebase-token': token} = request.headers;
//         const decodedToken = await getAuth().verifyIdToken(token);
//         const { uid } = decodedToken;
//         admin = await AdminModel.findOne({uid}).exec();
//     } catch (error) {
//         const response = h.response({
//             status: 'fail',
//             message: 'Invalid Token!'
//         }).code(400);

//         return response;
//     }

//     // const user = await UserModel.findOne({uid: request.params.uid});
//     // return h.response(user);

//     try {
//         // const {role} = request.payload;
//         if(user.role === 'admin') {
//         // if(role === 'admin') {
//             const user = await UserModel.findOne({uid: request.params.uid});
//             return h.response(user);
//         }
//     } catch (error) {
//         const response = h.response({
//             status: 'fail',
//             message: 'Server Error!'
//         }).code(500);

//         return response;
//     }
// };

