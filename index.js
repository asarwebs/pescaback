const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://damon:sql1205@clusterfish-rbt35.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "example";

const app = express();
const mongo = require("./db/connect");
app.use( logger("dev") );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

var database, collection;

require("./routes/views")(app);
require("./routes/special")(app);
require("./routes/api")(app);

async function initMongo(){
    const db = await mongo.connect();
    if(db) { initExpress(); }
}

function initExpress() {
    console.log('Iniciando Express');
    app.listen(3000, ()=>{
        console.log("Express ha iniciado correctamente!");
        process.on("SIGINT", closeApp);
        process.on("SIGTERM", closeApp);
    });
}

function closeApp(){
    mongo.disconnect()
        .then(()=>process.exit(0));
}

initMongo();