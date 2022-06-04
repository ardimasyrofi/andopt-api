const verifyUser = async (request, h) => {
    let user = null;
    const { db, getAuth } = request.server.app.firestore;
    const { boom } = request.server.app;
    try {
        const {'x-firebase-token': token} = request.headers;
        const decodedToken = await getAuth().verifyIdToken(token);
        const { uid } = decodedToken;
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