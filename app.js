
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ws_connect_mongodb = require("./DB/ws_connect_mongodb");
const ws_crud_mongo = require("./DB/ws_crud_mongo");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

ws_connect_mongodb.connect().then(client => {
    console.log('Connected to MongoDB database');
    const db = client.db("defaultdb");
    const collection = db.collection('ws_masks');

    app.get('/find/:id', async (req, res) => {
        const id = req.params.id;
        try {
            await ws_crud_mongo.findInCollectionByQuery(collection, {id: id}).then(document => {
                res.json(document);
            })
        } catch (error) {
            console.error('Error finding document by id', error);
            res.status(500).send('Error finding document by id');
        }
    });

    app.post('/insert', async (req, res) => {
        const data = req.body;
        try {
            await ws_crud_mongo.insertIntoCollection(collection, data);
            res.status(201).send('Document inserted');
        } catch (error) {
            console.error('Error inserting document', error);
            res.status(500).send('Error inserting document');
        }
    });

    // Update operation
    app.put('/update/:id', async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        try {
            await ws_crud_mongo.updateInCollection(collection, { id: id }, { $set: update });
            res.send('Document updated');
        } catch (error) {
            console.error('Error updating document', error);
            res.status(500).send('Error updating document');
        }
    });

    // Delete operation
    app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        try {
            await ws_crud_mongo.deleteInCollection(collection, { id: id });
            res.send('Document deleted');
        } catch (error) {
            console.error('Error deleting document', error);
            res.status(500).send('Error deleting document');
        }
    });

    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
}).catch(err => {
    console.error('Error connecting to MongoDB database', err);
});

module.exports = app;