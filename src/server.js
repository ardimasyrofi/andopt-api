const Hapi = require('@hapi/hapi');
const Mongoose = require('mongoose');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
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

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();  