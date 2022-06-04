const Hapi = require('@hapi/hapi');
const boom = require('@hapi/boom');
const routes = require('./routes');
const Mongoose = require('mongoose');
const firebase = require('./services/firebase');

const init = async () => {
    const server = Hapi.server({
        port: 4000,
        host: 'localhost',
        routes: {
            cors: {
            origin: ['*']
            }
        }
    });

    const { firestore } = await firebase.init();
    server.app.firestore = firestore;
    server.app.boom = boom;

    Mongoose.connect("mongodb+srv://mv4:0987poiu@andopt-app-maviav1.tmpnc.mongodb.net/andopt-api",{ 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    await server.register(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();  