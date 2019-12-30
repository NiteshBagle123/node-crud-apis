// CRUD operation
const { MongoClient, ObjectID } = require('mongodb');
const connectionUrl = 'mongodb://127.0.0.1:27017';
const dataBaseName = 'task-manager';

const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString());
console.log(id.getTimestamp());

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if(err){
        return console.log('Unable to connect to database');
    }
    const db = client.db(dataBaseName);
    // Create Document
    db.collection('users').insertOne({
        name: 'Vikram',
        age: 24
    }, (error, result) =>{
        if(error){
            return console.log('Unable to insert user')
        }
        console.log(result.ops);
    });

    db.collection('users').insertMany([
        {
            name: 'Sameer',
            age: 23
        },
        {
            name: 'Dipali',
            age: 23
        }
    ], (err, result) => {
        if(err){
            return console.log('Unable to insert documents');
        }
        console.log(result.ops);
    });

    db.collection('tasks').insertMany([
        {
            description: 'DMS Research',
            completed: true
        },
        {
            description: 'DMS EIP Queries',
            completed: false
        },
        {
            description: 'RO APIS',
            completed: true
        }
    ], (err, result) => {
        if(err){
            return console.log('Unable to insert documents');
        }
        console.log(result.ops);
    });

    // Read Document
    db.collection('users').findOne({ _id: new ObjectID("5e07477eba8c900cd97b5901") }, (err, user) => {
        if(err){
            return console.log('Unable to fetch document');
        }
        console.log(user);
    });

    db.collection('users').find({ age: 23 }).toArray((error, users) => {
        console.log(users);
    });

    db.collection('tasks').findOne({ _id: new ObjectID("5e0741f8e8b4050bcdfc0820") }, (err, task) => {
        if(err){
            return console.log('Unable to fetch document');
        }
        console.log(task);
    });

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks);
    });
    
    // Update Document
    db.collection('users').updateOne({
            _id: new ObjectID("5e073e3408566c0af00b0126") 
    }, {
        $inc: {
            age: 1
        }
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });

    // Delete document

    db.collection('users').deleteMany({
        age: 23
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });

    db.collection('users').deleteOne({
        age: 25
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });

    db.collection('tasks').deleteOne({
        description: 'DMS EIP Queries'
    }).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });
})