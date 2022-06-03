const Hapi = require('@hapi/hapi');
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require("./serviceAccountKey.json");
const Mongoose = require('mongoose');
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

const AdminRoutes = require('./routes/AdminRoutes');
const SpvRoutes = require('./routes/SpvRoutes');

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

    initializeApp({
        credential: cert(serviceAccount),
    });


    Mongoose.connect("mongodb+srv://mv4:0987poiu@andopt-app-maviav1.tmpnc.mongodb.net/andopt-api",{ 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = Mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    server.route(UserRoutes);
    server.route(PetRoutes);

    server.route(AdminRoutes);
    server.route(SpvRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();  