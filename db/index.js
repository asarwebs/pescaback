const mongo = require("./connect");
const { DB_NAME } = require("./config");

module.exports = {
    getFilms: function(){
        const db = mongo.instance().db(DB_NAME);
        const resp = db.collection("films").find().toArray();
        return resp;
    },
    getFilmByID: function(date){
        const db = mongo.instance().db(DB_NAME);
        const resp = db.collection("films").find({date}).toArray();
        return resp;
    },
    postFilm: function(film) {
        const db = mongo.instance().db(DB_NAME);
        const resp = db.collection("films").insertOne(film);
        return resp;
    }
}