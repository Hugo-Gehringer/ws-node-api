const ws_connect_mongodb = require('./ws_connect_mongodb');

// async function main() {
//     try {
//         // Connect to the MongoDB database
//         const client = await ws_connect_mongodb.connect();
//         console.log('Connected to MongoDB database');
//
//         const db = client.db("defaultdb");
        // //ws masks
        // const collection = db.collection('ws_masks');
        // insertIntoCollection(collection,{ id: '1', name: 'mask1', description: 'description1', mask_json: 'json1' })
        //
        // findInCollectionByQuery(collection,{id :'1'})

        // updateInCollection(collection,{id :'1'},{ $set: { name: 'updated mask' } })
        //
        // deleteInCollection(collection,{id :'1'})

        //ws entries
        // const collectionEntries= db.collection('ws_entries');
        // insertIntoCollection(collectionEntries,{ id: '1', id_mask: '1',  entry_json: {test:'test'} })
        //
        // findInCollectionByQuery(collectionEntries,{id :'1'})
        //
        // updateInCollection(collection,{id :'1'},{ $set: { entry_json: {test:'test'} } })
        //
        // deleteInCollection(collectionEntries,{id :'1'})

//     } catch (err) {
//         console.error('Error performing CRUD operations', err);
//     }
// }
//
// main();

async function insertIntoCollection(collectionName, data){
    return  await collectionName.insertOne(data);
}

async function findInCollectionByQuery(collectionName, query){
    return await collectionName.findOne(query);
}

async function updateInCollection(collectionName, query, update){
    return await collectionName.updateOne(query, update);
}

async function deleteInCollection(collectionName, query){
    return collectionName.deleteOne(query);
    console.log(`Deleted ${deleteResult.deletedCount} document(s)`);
}

module.exports = {
    insertIntoCollection,
    findInCollectionByQuery,
    updateInCollection,
    deleteInCollection
};