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
        isAdopted: false,
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

// 2.1 - Create Like Pets
exports.createLikePet = async(request, h) =>{
    verifyUser(request,h);

    const { pet_id } = request.params;
    const { user_uid } = request.payload;
    const newLike = {
        user_uid,
        pet_id,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
       const like = await db.collection('likes').add(newLike);

        const response = h.response({
            status: 'success',
            message: 'Favorite pet created successfully',
            like: {
                id: like.id,
                createdAt: newLike.createdAt,
            }
        }).code(201);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

exports.getAllLikes = async(request, h) => {
    verifyUser(request, h);

    const { pet_id } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const result = await db.collection('likes').where('pet_id', '==', pet_id).get();
        const likes = []
        result.docs.forEach(doc => {
            likes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        const response = h.response({
            status: 'success',
            message: 'Pet likes retrieved successfully',
            likes
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
}

exports.getAllLikesByUser = async(request, h) => {
    verifyUser(request, h);

    const { user_uid } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const result = await db.collection('likes').where('user_uid', '==', user_uid).get();
        const likes = []
        result.docs.forEach(doc => {
            likes.push({
                id: doc.id,
                ...doc.data()
            });
        });
        const response = h.response({
            status: 'success',
            message: 'User likes retrieved successfully',
            likes
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
}

// 2.2 - Delete Like Pets
exports.deleteLikePets = async(request, h) => {
    verifyUser(request, h);

    const { id } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('likes').doc(id).delete();

        const response = h.response({
            status: 'success',
            message: 'Favorite pet deleted successfully',
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

//3.1 Adopt
exports.createAdopt = async (request, h) => {
    verifyUser(request, h);

    const { pet_id } = request.params;
    const { isAdopted } = request.payload;
    const updatedPet = {
        isAdopted,
        updatedAt: new Date(),
    }
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('pets').doc(id).update(updatedPet);

        const response = h.response({
            status: 'success',
            message: 'Pet Adopted successfully',
            pet: {
                id: pet_id,
                updatedAt: new Date(),
            }
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

// 3.2 Search
exports.searchPets = async (request, h) => {
    // verifyUser(request, h);

    const { query, location } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try{
        const result = await db.collection('pets').where('location', '==', location).get();
        const pets = [];
        result.docs.forEach(doc => {
            const type = doc.data().type.name.toLowerCase() + ' ' + doc.data().type.race.toLowerCase();
            if(type.includes(query.toLowerCase())){
                pets.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        });

        const response = h.response({
            status: 'success',
            message: 'Pet searched successfully',
            pets
        }).code(200);
        return response;
    }catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};
