const Hapi = require('@hapi/hapi');
const hapiMongodb = require('hapi-mongodb');
var nanoid = require('nanoid');
// const { MongoClient, ServerApiVersion, ObjectID, Int32 } = require('mongodb');
const mongoose = require('mongoose');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // await server.register({
    //     plugin: hapiMongodb,
    //     options: {
    //       url: 'mongodb+srv://mv4:0987poiu@andopt-app-maviav1.tmpnc.mongodb.net/?retryWrites=true&w=majority',
    //       settings: {
    //           useUnifiedTopology: true
    //       },
    //       decorate: true
    //     }
    // });
    mongoose.connect("mongodb+srv://mv4:0987poiu@andopt-app-maviav1.tmpnc.mongodb.net/andopt-api",{ 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', (error)=> console.error(error));
    db.once('open', () => console.log('Database Connected'));
    console.log(db);

    var movie = new mongoose.Schema({
        title: String,
        post: String,
        cast: String,
        year: Number,
    }
    );

    const movieTable = mongoose.model('movie', movie)
    // Get all movies
    // Get all movies
    server.route({
        method: 'GET',
        path: '/movies',
        handler: async (req, h) => {
        
        // const uri = "mongodb+srv://mv4:0987poiu@andopt-app-maviav1.tmpnc.mongodb.net/?retryWrites=true&w=majority";
        // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        
        // client.connect(err => {
        //   const collection = client.db("andopt-api").collection("movies");
        //   // perform actions on the collection object
        //   client.close();
        // });
        
        //const movie = await req.mongo.db.collection('movies').findOne({})

        //return movie;
        const movieOne = await movieTable.find().exec();
        console.log(movieOne)

        const response = h.response({
            status: 'success',
            message: 'test',
            data: movieOne
        }).code(200);
        return response;
        }
    });

    // Get a single movie
    server.route({
        method: 'GET',
        path: '/movies/{id}',
        handler: async (req, h) => {
        
        const movieOne = await movieTable.find({_id: req.params.id}).exec();
        console.log(movieOne)

        const response = h.response({
            status: 'success',
            message: 'test',
            data: movieOne
        }).code(200);
        return response;
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/movies/{id}',
    //     handler: async (req, h) => {
    //         const id = req.params.id
    //         const ObjectID = req.mongo.ObjectID;

    //         const movie = await req.mongo.db('andopt-api').collection('movies').findOne({_id: new ObjectID(id)},{projection:{title:1,plot:1,cast:1,year:1}});
            
    //         return movie;
    //     }
    // });

    // Add a new movie to the database
    server.route({
        method: 'POST',
        path: '/movies',
        handler: async (req, h) => {

            const {title, post, cast, year} = req.payload;
            // const id = nanoid(16);

            const newMovie = {
                title: title, post: post, cast: cast, year: year 
            };

            // movieTable.push(newMovie);
            // var movieDetails = new movieTable({
            //     title: req.payload.title,
            //     post: req.payload.post,
            //     cast: req.payload.cast,
            //     year: req.payload.year,

            // });
               
            // movieDetails.save((err, doc) => {
            //     if (!err) {

            //     }
            //     else {
            //         console.log('Error during record insertion : ' + err);
            //     }
            // });

            console.log(req.payload)
            const insertMovie = new movieTable(newMovie);
            
            const result = await insertMovie.save();
            console.log(movie)
            
            console.log(result)

            // const status = await req.mongo.db('andopt-api').collection('movies').insertOne(payload);

            return result;
        }
    });

    // Get a single movie
    /*
    server.route({
        method: 'GET',
        path: '/movies/{id}',
        handler: (req, h) => {

            return 'Return a single movie';
        }
    });
*/
    // Update the details of a movie
    server.route({
        method: 'PUT',
        path: '/movies/{id}',
        handler: (req, h) => {

            return 'Update a single movie';
        }
    });

    // Delete a movie from the database
    server.route({
        method: 'DELETE',
        path: '/movies/{id}',
        handler: (req, h) => {

            return 'Delete a single movie';
        }
    });

    // Search for a movie
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