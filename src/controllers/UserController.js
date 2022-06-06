const { nanoid } = require('nanoid');
const verifyUser = require('../middlewares/verifyUser');

exports.createUser = async (request, h) => {
    const { uid, username, email, photoURL } = request.payload;
    const newUser = {
        username,
        email,
        photoURL,
        lastseen: [],
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('users').doc(uid).set(newUser);
        
        const response = h.response({
            status: 'success',
            message: 'User created successfully',
            user: {
                uid,
                createdAt: newUser.createdAt,
            }
        }).code(201);
        return response;
    } catch (error) {
        if (error.message.includes('ALREADY_EXISTS')) {
            return boom.conflict(`User id ${uid} already exists`);
        }
        return boom.badImplementation();
    }
};

exports.getUser = async (request, h) => {
    const { uid } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const user = await db.collection('users').doc(uid).get();

        if (!user.exists) {    
            return boom.notFound(`User id ${uid} not found`);
        } 

        const response = h.response({
            status: 'success',
            message: 'User data retrieved successfully',
            user: user.data()
        }).code(200);
        return response;
    } catch (error) {
    }
}

exports.updateUser = async (request, h) => {
    verifyUser(request, h);

    const { uid } = request.params;
    const { username, photoURL } = request.payload;
    const newUser = {
        username,
        photoURL,
        updatedAt: new Date(),
    }

    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('users').doc(uid).update(newUser);

        const response = h.response({
            status: 'success',
            message: 'User updated successfully',
            user: {
                uid,
                updatedAt: newUser.updatedAt,
            }
        }).code(200);
        return response;
    } catch (error){
        return boom.badImplementation();
    }
}

exports.addLastseen = async(request, h) => {
    verifyUser(request, h);
    
    const { pet_id } = request.payload;
    const { uid } = request.params;
    const id = nanoid(16);

    const lastseen = {
        id,
        pet_id,
    }

    const { db, FieldValue } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('users').doc(uid).update({
            lastseen: FieldValue.arrayUnion(lastseen)
        });
        
        const response = h.response({
            status: 'success',
            message: 'Lastseen was added!',
            user: {
                uid,
                lastseen,
            }
        }).code(201);
        return response;
    } catch (error) {
        return boom.badImplementation();
    }
}

exports.deleteLastseen = async(request, h) => {
    verifyUser(request, h);

    const { uid, id } = request.params;
    const { db, FieldValue } = request.server.app.firestore;
    const { boom } = request.server.app;
    try {
        const user = await db.collection('users').doc(uid).get();

        if (!user.exists) {    
            return boom.notFound(`User id ${uid} not found`);
        } 
        const lastseen = user.data().lastseen.find(lastseen => lastseen.id === id);
        await db.collection('users').doc(uid).update({
            lastseen: FieldValue.arrayRemove(lastseen)
        });

        const response = h.response({
            status: 'success',
            message: 'Lastseen was deleted!',
        }).code(200);
        return response;
    } catch (error) {
        if (error.message.includes('undefined')) {
            return boom.badRequest('Lastseen not found!');
        }
        return boom.badImplementation();
    }
};



