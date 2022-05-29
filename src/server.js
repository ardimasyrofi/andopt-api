const Hapi = require('@hapi/hapi');
const hapiMongodb = require('hapi-mongodb');
var nanoid = require('nanoid');
const mongoose = require('mongoose');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    mongoose.connect("mongodb+srv://mv4:0987poiu@andopt-app-maviav1.tmpnc.mongodb.net/andopt-api",{ 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', (error)=> console.error(error));
    db.once('open', () => console.log('Database Connected'));
    console.log(db);

    var user = new mongoose.Schema({
        username: String,
        email: String,
        address: String,
    });

    const userCollection = mongoose.model('user', user)
    // Get all users
    server.route({
        method: 'GET',
        path: '/users',
        handler: async (req, h) => {
        
        const userOne = await userCollection.find().exec();
        console.log(userOne)

        const response = h.response({
            status: 'success',
            message: 'test user',
            data: userOne
        }).code(200);
        return response;
        }
    });

    // Get a single user
    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: async (req, h) => {
        
        const userOne = await userCollection.find({_id: req.params.id}).exec();
        console.log(userOne)

        const response = h.response({
            status: 'success',
            message: 'test',
            data: userOne
        }).code(200);
        return response;
        }
    });

    // Add a new user to the database
    server.route({
        method: 'POST',
        path: '/users',
        handler: async (req, h) => {
            const {username, email, address} = req.payload;

            const newUser = {
                username: username, email: email, address: address 
            };

            // console.log(req.payload)
            const insertUser = new userCollection(newUser);
            
            const result = await insertUser.save();
            // console.log(user)
            // console.log(result)
            return result;
        }
    });

    // --------------------------------------------> NOT YET <--------------------------------- //
    // Update the details of a user
    server.route({
        method: 'PUT',
        path: '/users/{id}',
        handler: (req, h) => {

            return 'Update a single user';
        }
    });

    // Delete a user from the database
    server.route({
        method: 'DELETE',
        path: '/users/{id}',
        handler: (req, h) => {

            return 'Delete a single user';
        }
    });

    // Search for a user
    server.route({
        method: 'GET',
        path: '/search',
        handler: (req, h) => {

            return 'Return search results for the specified term';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init();  