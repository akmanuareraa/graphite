const express = require("express");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const app = express();
var Web3 = require('web3');

const config = require("../src/config-backend")

const idAssetMinter = require("../src/ABI/IdAssetMinterABI");
const idAssetMinterAbi = JSON.parse(idAssetMinter);
const logisticsAssetMinter = require("../src/ABI/logisticsAssetMinterABI")
const logisticsAssetMinterAbi = JSON.parse(logisticsAssetMinter)

const owner = new HDWalletProvider(config.secret, config.rpc);
const web3 = new Web3(owner)
const idAssetMinterContract = new web3.eth.Contract(idAssetMinterAbi, config.idAssetMinterAddress);
const logisticsAssetMinterContract = new web3.eth.Contract(logisticsAssetMinterAbi, config.logisticsAssetMinterAddress);

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const dbName = "ezofis"

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


app.post("/addNewAsset", function (req, res) {
    console.log("Reached here", req.body);
    addAsset(req.body).then(function (response, error) {
        if (response) {
            console.log(response)
            res.status(200).json({ "New Asset Added": response });
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function addAsset(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("est");
        const results = await coll.insertOne({
            ...JSdoc
        })
        return results.insertedId;
    } catch (error) {
        console.log(error);
    }
}


app.get("/getLastRecord", function (req, res) {
    getLastRecord().then(function (response, error) {
        if (response) {
            console.log(response)
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found")
            } else {
                res.status(200).json(response)
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})


async function getLastRecord() {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("est");
        const Cursor = await coll.find({}).project({ refId: 1 }).sort({ "refId": -1 }).limit(1);
        const allValues = await Cursor.toArray();
        if (Cursor) {
            return allValues[0];
        } else {
            return 'No Record Found';
        }
    } catch (error) {
        console.log(error);
    }
}

app.get("/applicationExists", function (req, res) {
    console.log("Reached here", req.query);
    applicationExists(req.query).then(function (response, error) {
        if (response) {
            console.log(response)
            if (response.Status) {
                res.status(200).json(response.Status)
            } else {
                res.status(200).json(response.Status)
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})


async function applicationExists(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("est");
        const Cursor = await coll.find({ "appNo": JSdoc.appNo }).count() > 0;
        return { "Status": Cursor };
    } catch (error) {
        console.log(error);
    }
}

app.post("/updateIdCard", function (req, res) {
    console.log("Reached here", req.body);
    updateIdCard(req.body).then(function (response, error) {
        if (response) {
            if (response === 'ID Card does not exist') {
                res.status(404).json({ "Error": "No Matching ID Card found" })
            } else {
                res.status(200).json({ "ID Card Updated": response })
            }
        } else {
            //res.status(404).json({ "Error": error })
            res.status(500).json({ "Error": error })
        }
    })
})

async function updateIdCard(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("idcard");
        const Cursor = await coll.findOneAndUpdate(
            { "appNo": JSdoc.appNo },
            { $set: { "docno": JSdoc.docno, "expiry": JSdoc.expiry, "issued": JSdoc.issued } }
        )
        if (Cursor.value == null) {
            return 'ID Card does not exist'
        } else {
            return Cursor.value;
        }
    } catch (error) {
        console.log(error);
    }
}

app.post("/addNewId", function (req, res) {
    console.log("Reached here", req.body);
    addNewId(req.body).then(function (response, error) {
        if (response) {
            console.log(response)
            res.status(200).json({ "New ID Added": response });
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function addNewId(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("idcard");
        const Cursor = await coll.insertOne(
            {
                appNo: JSdoc.appNo,
                name: JSdoc.name,
                nationality: JSdoc.nationality,
                dob: JSdoc.dob,
                sex: JSdoc.sex
            }
        );
        return Cursor;
    } catch (error) {
        console.log(error);
    }
}


app.get("/getIdCard", function (req, res) {
    let param = null
    if (Object.keys(req.body).length !== 0) {
        param = req.body
    } else {
        param = req.query
    }
    console.log("Reached here", req.body);
    getIdCard(param).then(function (response, error) {
        if (response) {
            console.log(response)
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found")
            } else {
                res.status(200).json({ ID: response })
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})



async function getIdCard(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("idcard");
        const Cursor = await coll.findOne({ "docno": JSdoc.docno });
        if (Cursor) {
            return Cursor;
        } else {
            return 'No Record Found';
        }
    } catch (error) {
        console.log(error);
    }
}

app.get("/addVerifyToken", function (req, res) {
    getIdCard(req.body).then(function (response, error) {
        if (response) {
            console.log(response)
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found")
            } else {
                idAssetMinterContract.methods.addVerifyToken(req.body.token, req.body.docno).send({ from: config.owner })
                    .on('transactionHash', function (hash) {
                        console.log(hash)
                    })
                    .on('receipt', function (receipt) {
                        console.log(receipt)
                    })
                    .on('confirmation', function (confirmationNumber, receipt) {
                        if (confirmationNumber === 2) {
                            console.log(confirmationNumber, receipt)
                            res.status(200).json({ "Message": "Successfully added", "Transaction Hash": receipt.transactionHash })
                        }
                    })
                    .on('error', function (error, receipt) {
                        console.log({ "Message": "Failed", "Error": error })
                    })
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

app.post("/addSalesOrder", function (req, res) {
    console.log("Reached here", req.body);
    addSalesOrder(req.body).then(function (response, error) {
        if (response) {
            console.log(response)
            res.status(200).json({ "New Sales Order Added": response });
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function addSalesOrder(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("salesOrder");
        const Cursor = await coll.insertOne(
            { ...JSdoc }
        );
        return Cursor;
    } catch (error) {
        console.log(error);
    }
}

app.get("/getSalesOrder", function (req, res) {
    console.log("Reached here", req.query);
    getSalesOrder(req.query).then(function (response, error) {
        if (response) {
            console.log('RESPONSE: ', response)
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found")
            } else {
                res.status(200).json({ "SalesOrder": response })
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function getSalesOrder(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("salesOrder");
        const Cursor = await coll.find({ "pono": JSdoc.pono }).project({ _id: 0 })
        const value = await Cursor.toArray();
        if (Cursor) {
            if (value.length !== 0) {
                return value[0];
            } else {
                return 'No Record Found';
            }
        } else {
            return 'No Record Found';
        }
    } catch (error) {
        console.log(error);
    }
}

app.get("/getSalesOrderStatus", function (req, res) {
    let param = null
    if (Object.keys(req.body).length !== 0) {
        param = req.body
    } else {
        param = req.query
    }
    getSalesOrder(param).then(function (response, error) {
        if (response) {
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found in Database. Recheck Input Parameters.")
            } else {
                let salesOrderFromDB = response
                getAssetStatus(response).then(function (response, error) {
                    if (response) {
                        res.status(200).json({ "Status": response, "SalesOrder": salesOrderFromDB})
                    } else {
                        console.log(error)
                    }
                })
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

// invoice

app.post("/addInvoice", function (req, res) {
    console.log("Reached here", req.body);
    addInvoice(req.body).then(function (response, error) {
        if (response) {
            console.log(response)
            res.status(200).json({ "New Invoice Added": response });
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function addInvoice(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("invoice");
        const Cursor = await coll.insertOne(
            { ...JSdoc }
        );
        return Cursor;
    } catch (error) {
        console.log(error);
    }
}

app.get("/getInvoice", function (req, res) {
    console.log("Reached here", req.query);
    getInvoice(req.query).then(function (response, error) {
        if (response) {
            console.log('RESPONSE: ', response)
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found")
            } else {
                res.status(200).json({ "Invoice": response })
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function getInvoice(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("invoice");
        const Cursor = await coll.find({ "invoiceno": JSdoc.invoiceno }).project({ _id: 0 })
        const value = await Cursor.toArray();
        if (Cursor) {
            if (value.length !== 0) {
                return value[0];
            } else {
                return 'No Record Found';
            }
        } else {
            return 'No Record Found';
        }
    } catch (error) {
        console.log(error);
    }
}

app.get("/getInvoiceStatus", function (req, res) {
    let param = null
    if (Object.keys(req.body).length !== 0) {
        param = req.body
    } else {
        param = req.query
    }
    getInvoice(param).then(function (response, error) {
        if (response) {
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found in Database. Recheck Input Parameters.")
            } else {
                let invoiceFromDB = response
                getAssetStatus(response).then(function (response, error) {
                    if (response) {
                        res.status(200).json({ "Status": response, "Invoice": invoiceFromDB })
                    } else {
                        console.log(error)
                    }
                })
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

// logistics

app.post("/addLogistics", function (req, res) {
    console.log("Reached here", req.body);
    addLogistics(req.body).then(function (response, error) {
        if (response) {
            console.log(response)
            res.status(200).json({ "New Logistics Added": response });
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function addLogistics(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("logistics");
        const Cursor = await coll.insertOne(
            { ...JSdoc }
        );
        return Cursor;
    } catch (error) {
        console.log(error);
    }
}

app.get("/getLogistics", function (req, res) {
    console.log("Reached here", req.query);
    getLogistics(req.query).then(function (response, error) {
        if (response) {
            console.log('RESPONSE: ', response)
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found")
            } else {
                res.status(200).json({ "Logistics": response })
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function getLogistics(JSdoc) {
    try {
        await client.connect();
        const database = client.db(dbName);
        const coll = database.collection("logistics");
        const Cursor = await coll.find({ "cha": JSdoc.cha }).project({ _id: 0 })
        const value = await Cursor.toArray();
        if (Cursor) {
            if (value.length !== 0) {
                return value[0];
            } else {
                return 'No Record Found';
            }
        } else {
            return 'No Record Found';
        }
    } catch (error) {
        console.log(error);
    }
}

app.get("/getLogisticsStatus", function (req, res) {
    let param = null
    if (Object.keys(req.body).length !== 0) {
        param = req.body
    } else {
        param = req.query
    }
    getLogistics(param).then(function (response, error) {
        if (response) {
            if (response === 'No Record Found') {
                res.status(404).json("No Record Found in Database. Recheck Input Parameters.")
            } else {
                let logisticsFromDB = response
                getAssetStatus(response).then(function (response, error) {
                    if (response) {
                        res.status(200).json({ "Status": response, "Logistics": logisticsFromDB })
                    } else {
                        console.log(error)
                    }
                })
            }
        } else {
            res.status(500).json({ "Error": error })
        }
    })
})

async function getAssetStatus(JSdoc) {
    try {
        let hash = Web3.utils.keccak256(JSON.stringify(JSdoc))
        let orderStatus = await logisticsAssetMinterContract.methods.assetsIssued(hash).call({ from: config.owner })
        console.log('orderStatus', orderStatus)
        if (orderStatus.customerApproval) {
            return "Approved"
        } else {
            return "Not Approved"
        }
    } catch (error) {
        console.log('ERROR')
    }
}