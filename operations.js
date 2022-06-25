//4 methods to insert, find, remove and update documents and export them

//require assert module, strict version
const assert = require('assert').strict;

//4 parameters: db that we're using, the document that we want to insert, the collection that the document is in, and a callback function that will be called at the end
exports.insertDocument = (db, document, collection, callback) => {
    //way to access collection in a connected database
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        //pass result object into the callback function named callback (defined somewhere else)
        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    //find has empty parameter list to indicate that we want to find all documents in this collection, toarray to put all the documents that were found into an array
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    //4 parameters: object that contains info about the document that we want to update, object containing the information about the updates that we want to make (update operator ($set: update object)), certain optional configurations, callback that will either give us an error or the result of the operation 
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};