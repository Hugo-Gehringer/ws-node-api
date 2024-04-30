const request = require('request');

function testApi(){
    // Insert operation
    console.log("Testing insert operation...");
    request.post({
        headers: {'content-type' : 'application/json'},
        url:     'http://localhost:3000/insert',
        body:    JSON.stringify({name: 'Test', value: 'Value'})
    }, function(error, response, body){
        console.log(body);
    });

// Find operation
    console.log("Testing find operation...");
    let id = '1'; // Replace with the id of the document you inserted
    request('http://localhost:3000/find/' + id, function(error, response, body){
        console.log(body);
    });

// Update operation
    console.log("Testing update operation...");
    request.put({
        headers: {'content-type' : 'application/json'},
        url:     'http://localhost:3000/update/' + id,
        body:    JSON.stringify({name: 'Updated'})
    }, function(error, response, body){
        console.log(body);
    });

// Delete operation
    console.log("Testing delete operation...");
    request.delete('http://localhost:3000/delete/' + id, function(error, response, body){
        console.log(body);
    });
    console.log("End test script")
}
testApi()