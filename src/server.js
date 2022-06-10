const Hapi = require('@hapi/hapi');
const boom = require('@hapi/boom');
const routes = require('./routes');
const firebase = require('./services/firebase');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost',
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