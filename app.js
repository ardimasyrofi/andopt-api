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
    // change data by Id ==> ERROR
    const updatePromise = db.collection('users').updateOne(
        {
            _id: ObjectId('628a36ba492d1dee6f29642e'),
        },
        {
            $set: {
                username: 'Rida',
            },
        }
    );

    updatePromise.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
   // change documents by criteria ==> CAN
   /*
   const updatePromises = db.collection('users').updateMany(
        {
            username: 'Vrizasss',
        },
        {
            $set: {
                username: 'Vriz',
            }
        }
    )
    updatePromises.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    */
   // remove data by Id ==> ERROR
   /*
   db.collection('users')
       .deleteOne({
           _id: ObjectID('628a36ba492d1dee6f29642e'),
       })
       .then((result) => {
           console.log(result);
       })
       .catch((error) => {
           console.log(error);
       });
    */
   // remove data by username ==> CAN
   /*
   db.collection('users')
       .deleteOne({
           username: 'Vriz',
       })
       .then((result) => {
           console.log(result);
       })
       .catch((error) => {
           console.log(error);
       });
    */
   // remove datas ==> CAN
   /*
   db.collection('users')
       .deleteMany({
           username: 'Vriz',
       })
       .then((result) => {
           console.log(result);
       })
       .catch((error) => {
           console.log(error);
       });
    */
});