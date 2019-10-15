const API_PATH = "/api"
const { postFilm, getFilms } = require ("../../db")
var cors = require('cors');


module.exports = (app) => {
    app.use(cors());
    app.post(`${API_PATH}/film`, async (req, res)=>{
        const film = JSON.parse(req.body.film);
        if(film){
            const resp = await postFilm(film);
            // setTimeout(() => {
            //     console.log(resp)
            // }, 5000);
            return res.json(resp);
        }
        res.status(400).send({ reason: "No Film Sent."})
    });
    app.get(`${API_PATH}/films`, async (req, res)=>{ 
        const resp = await getFilms();
        // setTimeout(() => {
        //     console.log(resp)
        // }, 5000);
        return res.json(resp)
     });
};