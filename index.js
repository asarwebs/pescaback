const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

require('dotenv').config({path: 'variables.env'});

const app = express();
const mongo = require("./db/connect");
app.use( logger("dev") );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

require("./routes/views")(app);
require("./routes/special")(app);
require("./routes/api")(app);

async function initMongo(){
    const db = await mongo.connect();
    if(db) { initExpress(); }
}

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

function initExpress() {
    console.log('Iniciando Express');
    app.listen(port, host, ()=>{
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