const Hapi = require('@hapi/hapi');
const boom = require('@hapi/boom');
const routes = require('./routes');
const firebase = require('./services/firebase');
require('dotenv').config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 4000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['x-firebase-token']
            }
        }
    });

    const { firestore } = await firebase.init();
    server.app.firestore = firestore;
    server.app.boom = boom;

    await server.register(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();  