const verifyUser = require('../middlewares/verifyUser');

exports.createPet = async (request, h) => {
    verifyUser(request, h);

    const { uid } = request.params;
    const { id, name, imageUrls, age, gender, type, location, desc } = request.payload;
    const newPet = {
        id,
        user_uid: uid,
        name,
        imageUrls,
        age,
        gender,
        type,
        location,
        desc,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const pet = await db.collection('pets').doc(id).set(newPet);

        const response = h.response({
            status: 'success',
            message: 'Pet created successfully',
            pet: {
                user_uid: uid,
                id: pet.id,
                createdAt: newPet.createdAt,
            }
        }).code(201);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

exports.getPet = async(request, h) => {
    const { id } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const pet = await db.collection('pets').doc(id).get();
        const response = h.response({
            status: 'success',
            message: 'Pet data retrieved successfully',
            pet: pet.data()
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

exports.getAllPets = async (request, h) => {
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const pets = await db.collection('pets').get();
        const response = h.response({
            status: 'success',
            message: 'All pets retrieved successfully',
            pets: pets.docs.map(doc => doc.data())
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

exports.updatePet = async(request, h) => {
    verifyUser(request, h);

    const { id } = request.params;
    const { name, imageUrl, age, gender, type, location, description } = request.payload;
    const updatedPet = {
        name,
        imageUrl,
        age,
        gender,
        type,
        location,
        description,
        updatedAt: new Date(),
    }
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('pets').doc(id).update(updatedPet);

        const response = h.response({
            status: 'success',
            message: 'Pet updated successfully',
            pet: {
                id,
                updatedAt: new Date(),
            }
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
}

exports.deletePet = async(request, h) => {
    verifyUser(request, h);

    const { id } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('pets').doc(id).delete();

        const response = h.response({
            status: 'success',
            message: 'Pet deleted successfully',
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

