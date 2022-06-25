//require mongodb node.js driver and imported in the mongoclient object from it
const MongoClient = require('mongodb').MongoClient;
//require assert and use the strict version
const assert = require('assert').strict;
//require operations module
const dboper = require('./operations');

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

        //insert document into this collection
        //calling insertDocument function
        //result: defining callback function which wont be called until later at the end of insertDocument when it's called
        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites', result => {
            console.log('Insert Document:', result.ops); //ops short for operations, contain an array with the document that was inserted
            //method will immediately close the client's connection to the mongodb server
            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents: ', docs);
                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description"}, 'campsites', result => {
                    //console.log count of documents updated
                    console.log('Updated Document count: ', result.result.nModified);
                    dboper.findDocuments(db, 'campsites', docs => {
                        console.log('Found Documents: ', docs);
                        dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites', result => {
                            console.log('Deleted Document Count: ', result.deleteCount);
                            client.close();
                        });
                    });
                });
            });
        });
    });
});



/*
DELETED --

        //recreate campsite's collection and get access to it
        const collection = db.collection('campsites');

                    //print to the console all the documents that are now in this collection
            //in order to get the find method to return all the documents, give it an empty parameter list
            //toArray: convert the documents to an array of objects
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                //method will immediately close the client's connection to the mongodb server
                client.close();
            }

*/