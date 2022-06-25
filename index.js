//define const that will act as a client for the mongo server that requires the mongodb node driver and mongo client object
const MongoClient = require('mongodb').MongoClient;
//require assert and use the strict version
const assert = require('assert').strict;

//set up a connection to the mongodb server
//url where the mongodb server can be accessed
const url = 'mongodb://localhost:27017/';
//name of the particular database we want to connect to
const dbname = 'nucampsite';

//access server, this method allows us to connect the mongo client with the mongodb server
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    //check to make sure that the error is not null
    //first argument is the actual value we are checking, second argument is the expected value that we're checking against to see if the first argument strictly equals the second
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    //connect to the nucampsite database on the mongodb server
    const db = client.db(dbname);

    //deleting all the documents in the campsites collection or "drop" a collection
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        //recreate campsite's collection and get access to it
        const collection = db.collection('campsites');

        //insert document into this collection
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops); //ops short for operations, contain an array with the document that was inserted

            //print to the console all the documents that are now in this collection
            //in order to get the find method to return all the documents, give it an empty parameter list
            //toArray: convert the documents to an array of objects
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                //method will immediately close the client's connection to the mongodb server
                client.close();
            });
        });
    });
});