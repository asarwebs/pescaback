const API_PATH = "/api"
const { postFilm, getFilms } = require ("../../db")
app.use(cors());

module.exports = (app) => {
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