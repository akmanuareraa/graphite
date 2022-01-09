const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 

const { MongoClient } = require("mongodb");
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "ezofis"
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
    addAsset(req.body).then(function(response,error){
        if(response)
        {
            console.log(response)
            res.status(200).json({"New Asset Added": response});
        } else {
            res.status(500).json({"Error": error})
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
    getLastRecord().then(function(response,error){
        if(response)
        {
            console.log(response)
            if(response == 'No Record Found') {
                res.status(404).json("No Record Found")
            } else {                          
                res.status(200).json(response)
            }
        } else {
            res.status(500).json({"Error": error})
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
        if(Cursor){
            return allValues[0];
        } else {
            return 'No Record Found';
        }
    } catch(error)
    {
        console.log(error);
    } 
}

app.post("/updateIdCard", function(req,res){
    console.log("Reached here",req.body);
    updateIdCard(req.body).then(function(response,error){
        if(response)
        {
            if(response === 'ID Card does not exist'){
                res.status(404).json({"Error": "No Matching ID Card found"})
            } else {
                res.status(200).json({"ID Card Updated": response})
            }
        } else {
            res.status(404).json({"Error": error})
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
        if(Cursor.value==null){
            return 'ID Card does not exist'
        } else {
            return Cursor.value;
        }
    } catch(error)
    {
        console.log(error);
    } 
}

app.post("/addNewId", function(req,res){
    console.log("Reached here",req.body);
    addNewId(req.body).then(function(response,error){
        if(response)
        {
            console.log(response)
            res.status(200).json({"New ID Added": response});
        } else {
            res.status(500).json({"Error": error})
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
        //const allValues = await Cursor.toArray();     
        return Cursor;
    } catch(error)
    {
        console.log(error);
    } 
}

app.get("/getIdCard", function(req,res){
    console.log("Reached here",req.body);
    getIdCard(req.body).then(function(response,error){ 
        if(response)
        {
            console.log(response)
            if(response == 'No Record Found') {
                res.status(404).json("No Record Found")
            } else {                          
                res.status(200).json({"ID Card": response})
            }
        } else {
            res.status(500).json({"Error": error})
        }
    })    
})

async function getIdCard(JSdoc) {
    try 
    {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("idcard");
        const Cursor = await coll.findOne({"estId": JSdoc.estId});
        console.log('Cursor: ', Cursor)
        if(Cursor){
            return Cursor;
        } else {
            return 'No Record Found';
        }
    } catch(error)
    {
        console.log(error);
    } 
}
