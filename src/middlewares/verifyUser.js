const verifyUser = async (request, h) => {
    const { db, getAuth } = request.server.app.firestore;
    const { boom } = request.server.app;
    const {'x-firebase-token': token} = request.headers;
    
    let user = null;
    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        const { uid } = decodedToken;

        if (uid !== request.params.uid) {
            return boom.unauthorized('User is not authorized to perform this action');
        }

        user = await db.collection('users').doc(uid).get();

        if (!user.exists) {    
            return boom.notFound(`User id ${uid} not found, verify your token`);
        }
    } catch (error) {
        return boom.notFound(`Invalid Token!`);
    }

    return user;
}

module.exports = verifyUser;