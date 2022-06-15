//Create Admin
exports.createAdmin = async (request, h) => {
    const user = verifyUser(request, h);
    if (user.data().role !== 'spv') {
        return boom.unauthorized('You are not authorized to perform this action');
    }

    const { uid } = request.payload;
    const newUser = {
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('users').doc(uid).set(newUser);
        
        const response = h.response({
            status: 'success',
            message: 'Admin created successfully',
            data: {
                uid,
                createdAt: newUser.createdAt,
            }
        }).code(201);
        return response;
    } catch (error) {
        if (error.message.includes('ALREADY_EXISTS')) {
            return boom.conflict(`Admin id ${uid} already exists`);
        }
        return boom.badImplementation();
    }
};

//Get All Admin
exports.getAllAdmin = async (request, h) => {
    const {db} = request.server.app.firestore;
    const {boom} = request.server.app;

    try {
        const admins = await db.collection('users').where('role', '==', 'admin').get();
        const response = h.response({
            status: 'success',
            message: 'All Admin retrieved successfully',
            admin: admins.docs.map(doc => {
                return {
                    uid: doc.id,
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

//Search Admin
exports.searchAdmin = async (request, h) => {
    const {username} = request.params;
    const {db} = request.server.app.firestore;
    const {boom} = request.server.app;

    try {
        const result = await db.collection('users').where('role', '==', 'admin').get();
        const admins = [];
        result.docs.forEach(doc => {
            const nameAdmin = doc.data().username.toLowerCase();
            const usernameLoweredCase = username.toLowerCase();
            if(nameAdmin.includes(usernameLoweredCase)){
                admins.push({
                    uid: doc.uid,
                    ...doc.data()
                });
            }
        });

        const response = h.response({
            status: 'success',
            message: 'Admin searched successfully',
            admins
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};


//Delete Admin
exports.deleteAdmin = async (request, h) => {
    const user = verifyUser(request, h);
    if (user.data().role !== 'spv') {
        return boom.unauthorized('You are not authorized to perform this action');
    }

    const { uid } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const admins = await db.collection('users').where('role', '==', 'admin').doc(uid).delete();
        const response = h.response({
            status: 'success',
            message: 'Admin deleted successfully',
            admins
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

