const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 

const { MongoClient } = require("mongodb");
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = ""
//const coll = []

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Backend server is running @ PORT-", port);
	
});


app.post("/addNewAsset", function(req,res){
    
    console.log("Reached here",req.body);
    var sendResponseObject={};
    addAsset(req.body).then(function(response,error){
        
        if(response)
        {
            sendResponseObject['ID Created'] = response;                          
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.status(200).end()
        } else {
            sendResponseObject['error'] = error;
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.status(400).end()
        }
    })    
})

async function addAsset(JSdoc) {
    try 
    {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("est");
        const results = await coll.insertOne({
            ...JSdoc
        })
        console.log(
            `${results.insertedCount} document inserted with the _id: ${results.insertedId}`,
        );
        return results.insertedId;
    } catch(error)
    {
        console.log(error);
    } 
}


app.post("/getLastRecord", function(req,res){
    console.log("Reached here",req.body);
    var sendResponseObject={};
    getLastRecord().then(function(response,error){
        
        if(response)
        {
            sendResponseObject['Last Record'] = response;                          
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(response)
            res.send(jsonString);
            res.status(200).end() 
        } else {
            sendResponseObject['error'] = error;
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.status(400).end()
        }
    })    
})

async function getLastRecord() {
    try 
    {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("est");
        const Cursor = await coll.find({}).project({refId: 1}).sort({"refId": -1}).limit(1);
        const allValues = await Cursor.toArray();
        return allValues[0];
    } catch(error)
    {
        console.log(error);
    } 
}

app.post("/updateIdCard", function(req,res){
    
    console.log("Reached here",req.body);
    var sendResponseObject={};
    updateIdCard(req.body).then(function(response,error){
        
        if(response)
        {
            sendResponseObject['ID Card Updated'] = response;                          
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.status(200).end() 
        } else {
            sendResponseObject['error'] = error;
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.status(400).end()
        }
    })    
})

async function updateIdCard(JSdoc) {
    try 
    {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("idcard");
        const Cursor = await coll.findOneAndUpdate(
            {"appNo": JSdoc.appNo},
            {$set: {"estId": JSdoc.estId, "expiry": JSdoc.expiry, "issued": JSdoc.issued}}
        )
        const allValues = await Cursor.toArray();    
        return allValues;
    } catch(error)
    {
        console.log(error);
    } 
}

app.post("/addNewId", function(req,res){
    console.log("Reached here",req.body);
    var sendResponseObject={};
    addNewId(req.body).then(function(response,error){
        
        if(response)
        {
            sendResponseObject['ID Card Added'] = response;                          
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.status(200).end()
        } else {
            sendResponseObject['error'] = error;
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.status(400).end()
        }
    })    
})

async function addNewId(JSdoc) {
    try 
    {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("idcard");
        const Cursor = await coll.insertOne(
            {
                appNo: JSdoc.appNo,
                estName: JSdoc.estName,
                pName: JSdoc.pName,
                sector: "Commercial"
            }
        );
        const allValues = await Cursor.toArray();     
        return allValues;
    } catch(error)
    {
        console.log(error);
    } 
}

app.post("/getIdCard", function(req,res){
    console.log("Reached here",req.body);
    var sendResponseObject={};
    getIdCard(req.body).then(function(response,error){
        
        if(response)
        {
            sendResponseObject['ID Card'] = response;                          
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.send(response);
            res.status(200).end()
        } else {
            sendResponseObject['error'] = error;
            console.log(sendResponseObject);
            console.log("sendResponseObject");
            let jsonString= JSON.stringify(sendResponseObject)
            res.send(jsonString);
            res.status(400).end()
        }
    })    
})

async function getIdCard(JSdoc) {
    try 
    {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("idcard");
        const Cursor = await coll.find({"estId": JSdoc.estId});
        const allValues = await Cursor.toArray();     
        return allValues[0];
    } catch(error)
    {
        console.log(error);
    } 
}
