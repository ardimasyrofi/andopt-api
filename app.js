const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://andopt-app:0987poiu@cluster0.nmek0.mongodb.net/?retryWrites=true&w=majority';
// 'mongodb://127.0.0.1:27017'; --> localhost
const dbName = 'andopt-app';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

client.connect((error, client) => {
    if(error) {
        return console.log('connection failed!');
    }
    // console.log('connection success!');

    // choose database
    const db = client.db(dbName);

    // add 1 data to collection users
    /*
    db.collection('users').insertOne(
        {
            username: 'Ardi',
            email: 'ardi@gmail.com'
        },
        (error, result) => {
            if(error) {
                return console.log('insert data failed!');
            }
            console.log(result);
        }
    );
    
    // add many data to collection users
    db.collection('users').insertMany(
        [
            {
                username: 'Vrizas',
                email: 'vrizas@gmail.com'
            },
            {
                username: 'Ardi',
                email: 'ardi@gmail.com'
            }
        ],
        (error, result) => {
            if(error) {
                return console.log('insert datas failed!');
            }
            console.log(result);
        }
    )
    */
   // show all data from collection users
   // db.collection('users').find(); // showing all data size big
   /*
    console.log(
        db
            .collection('users')
            .find()
            .toArray((error, result) => {
                console.log(result);
            })
    );
    
    // show all data from collection users with criteria
    console.log(
        db
            .collection('users')
            .find({ username: 'Dianrosz' })
            .toArray((error, result) => {
                console.log(result);
            })
    );
    */
    // update data by Id ==> ERROR
    /*
    const updatePromise = db.collection('users').updateOne(
        {
            _id: '628a3fba2f279b27314df15c',
        },
        {
            $set: {
                email: 'dianrosz@yahoo.com',
            },
        }
    );

    updatePromise.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
    */
});