const MongoClient = require("mongodb").MongoClient;
const config = require("./config");
const CONNECTION_URL = "mongodb+srv://damon:sql1205@clusterfish-rbt35.mongodb.net/test?retryWrites=true&w=majority";
let instance = null;
let isDisconnecting = false;

module.exports = {
    connect: () => {
        return new Promise((resolve, reject)=>{
            MongoClient.connect(CONNECTION_URL, { useUnifiedTopology:true ,useNewUrlParser: true }, function(err, client) {
                if (err) { reject(err); }
                console.log("Conectado satisfactoriamente al servidor de Mongo!");
                instance = client;
                resolve(client.db(config.DB_NAME));
            });
        });
    },
    disconnect: () => {
        if (instance && !isDisconnecting){
            isDisconnecting = true;
            console.log("Desconectando instancia de Mongo");
            return new Promise((resolve, reject)=>{
                instance.close((err, result)=>{
                    if (err) { reject(err); isDisconnecting=false; return; }
                    console.log("Instancia de Mongo desconectada!");
                    resolve();
                });
            })
        }
    },
    instance: () => {
        return instance;
    }
};