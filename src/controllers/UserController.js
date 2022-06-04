const { nanoid } = require('nanoid');
const verifyUser = require('../middlewares/verifyUser');

exports.createUser = async (request, h) => {
    const { uid } = request.payload;
    const newUser = {
        address : [],
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('users').doc(uid).set(newUser);
        
        const response = h.response({
            status: 'success',
            message: 'User created successfully',
            data: {
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

exports.addAddress = async(request, h) => {
    verifyUser(request, h);
    
    const { street, city, province } = request.payload;
    const { uid } = request.params;
    const id = nanoid(16);

    const address = {
        id,
        street,
        city,
        province,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const { db, FieldValue } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('users').doc(uid).update({
            address: FieldValue.arrayUnion(address)
        });
        
        const response = h.response({
            status: 'success',
            message: 'Address was added!',
            data: {
                uid,
                address,
            }
        }).code(201);
        return response;
    } catch (error) {
        return boom.badImplementation();
    }
}

exports.updateAddress = async(request, h) => {
    verifyUser(request, h);

    const { uid, id } = request.params;
    const { street, city, province } = request.payload;
    const { db, FieldValue } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const user = await db.collection('users').doc(uid).get();

        if (!user.exists) {    
            return boom.notFound(`User id ${uid} not found`);
        } 
        const address = user.data().address.find(address => address.id === id);
        await db.collection('users').doc(uid).update({
            address: FieldValue.arrayUnion({
                id,
                street,
                city,
                province,
                createdAt: address.createdAt,
                updatedAt: new Date(),
            })
        });
        await db.collection('users').doc(uid).update({
            address: FieldValue.arrayRemove(address)
        });

        const response = h.response({
            status: 'success',
            message: 'Address was updated!',
            data: {
                uid,
                address,
            }
        }).code(200);
        return response;
    } catch (error) {
        return boom.badImplementation();
    }
}

exports.deleteAddress = async(request, h) => {
    verifyUser(request, h);

    const { uid, id } = request.params;
    const { db, FieldValue } = request.server.app.firestore;
    const { boom } = request.server.app;
    try {
        const user = await db.collection('users').doc(uid).get();

        if (!user.exists) {    
            return boom.notFound(`User id ${uid} not found`);
        } 
        const address = user.data().address.find(address => address.id === id);
        await db.collection('users').doc(uid).update({
            address: FieldValue.arrayRemove(address)
        });

        const response = h.response({
            status: 'success',
            message: 'Address was deleted!',
        }).code(200);
        return response;
    } catch (error) {
        if (error.message.includes('undefined')) {
            return boom.badRequest('Address not found!');
        }
        return boom.badImplementation();
    }
};



