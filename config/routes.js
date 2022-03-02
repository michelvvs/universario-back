const express = require('express')
const routes = express.Router()

getTopMusic = require('../db/billboard')


routes.get('/', (req, res) => {
    
    return res.json('pangaré')
})

routes.get('/billboard', (req, res) => {
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