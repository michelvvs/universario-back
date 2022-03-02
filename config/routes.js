const express = require('express')
const routes = express.Router()

const cors = require('cors');

routes.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

getTopMusic = require('../db/billboard')


routes.get('/', (req, res) => {
    
    return res.json('pangaré')
})

routes.get('/billboard', cors(),  (req, res) => {
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const result = getTopMusic(year, month, day)
    .then((result) => {

        if (!result) {
            return res.json("deu nada, patrão")
        } else {
    
            return res.json(result)
        }
    })
})

module.exports = routes