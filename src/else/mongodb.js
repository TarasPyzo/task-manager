const mongodb = require('mongodb');

const dbURL = 'mongodb://localhost:27017';
const dbName = 'task-manager';

mongodb.MongoClient.connect(dbURL, (err, client) => {
  if(err) throw err;

  console.log('Connected successfully to server');
  const db = client.db(dbName);

  const usersCollection = db.collection('users');
  usersCollection.deleteMany({ name: 'name1' })
    .then((result) => {
      console.log(result.deletedCount);
    }).catch((error) => {
      console.log(error);
    });

  client.close();
});
