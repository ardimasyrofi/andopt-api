const verifyUser = require('../middlewares/verifyUser');

//Get Admin
exports.getAdmin = async (request, h) => {
    const { uid } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const admins = await db.collection('users').where('role', '==', 'admin').get();

        if (!admins.exists) {
            return boom.notFound(`Admin id ${uid} not found`);
        }

        const response = h.response({
            status: 'success',
            message: 'Admin data retrieved successfully',
            admins: {
                id: uid,
                ...admins.data()
            }
        }).code(200);
        return response;
    } catch (error) {
    }
};

//Update Admin
exports.updateAdmin = async (request, h) => {
    verifyUser(request, h);

    const { uid } = request.params;
    const { username, photoURL } = request.payload;
    const newAdmin = {
        username,
        photoURL,
        updatedAt: new Date(),
    }

    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('users').where('role', '==', 'admin').doc(uid).update(newAdmin);

        const response = h.response({
            status: 'success',
            message: 'Admin updated successfully',
            admin: {
                uid,
                updatedAt: newAdmin.updatedAt,
            }
        }).code(200);
        return response;
    } catch (error) {
        return boom.badImplementation();
    }
};

//Get All Users
exports.getAllUsers = async (request, h) => {
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const users = await db.collection('users').where('role', '==', 'user').get();
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

//Search By Username
exports.searchUsers = async (request, h) => {
    const { username } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try{
        const result = await db.collection('users').where('role', '==', 'user').get();
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

//Delete User
exports.deleteUsers = async (request, h) => {
    verifyUser(request, h);

    const { uid } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const users = await db.collection('users').doc(uid).delete();
        const response = h.response({
            status: 'success',
            message: 'User deleted successfully',
            users
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

//Delete Pet
exports.deletePets = async(request, h) => {
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

//Create Article
exports.createArticle = async (request, h) => {
    verifyUser(request, h);

    const { uid } = request.params;
    const { id, title, imageUrl, category, content } = request.payload;
    const newArticle = {
        user_uid: uid,
        title,
        imageUrl,
        category,
        content,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const article = await db.collection('articles').doc(id).set(newArticle);

        const response = h.response({
            status: 'success',
            message: 'Article created successfully',
            pet: {
                user_uid: uid,
                id: article.id,
                createdAt: newArticle.createdAt,
            }
        }).code(201);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};


//Get Articles
exports.getArticle = async(request, h) => {
    const { id } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const article = await db.collection('articles').doc(id).get();
        const response = h.response({
            status: 'success',
            message: 'Article data retrieved successfully',
            article:  {
                id,
                ...article.data()
            }
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

//Get All Articles
exports.getAllArticles = async (request, h) => {
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        const articles = await db.collection('articles').get();
        const response = h.response({
            status: 'success',
            message: 'All articles retrieved successfully',
            articles: articles.docs.map(doc => {
                return {
                    id: doc.id,
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

//Edit Articles
exports.updateArticle = async(request, h) => {
    verifyUser(request, h);

    const { id } = request.params;
    const { title, imageUrl, type, content} = request.payload;
    const updatedArticle = {
        title,
        imageUrl,
        type,
        content,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('articles').doc(id).update(updatedArticle);

        const response = h.response({
            status: 'success',
            message: 'Article updated successfully',
            article: {
                id,
                updatedAt: new Date(),
            }
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

//Delete Articles
exports.deleteArticle = async(request, h) => {
    verifyUser(request, h);

    const { id } = request.params;
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try {
        await db.collection('articles').doc(id).delete();

        const response = h.response({
            status: 'success',
            message: 'Article deleted successfully',
        }).code(200);
        return response;
    } catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
};

//Get Newest Articles
exports.getNewestArticles = async (request, h) => {
    const { db } = request.server.app.firestore;
    const { boom } = request.server.app;

    try{
        const articles = await db.collection('articles').orderBy('createdAt', 'desc').limit(12).get();

        const response = h.response({
            status: 'success',
            message: 'Newest articles retrieved successfully',
            articles: articles.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
        }).code(200);
        return response;
    }catch (error) {
        const response = boom.badRequest(error);
        return response;
    }
}
