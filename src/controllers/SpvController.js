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