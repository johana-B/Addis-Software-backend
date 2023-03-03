
const express = require('express')

const Router = express.Router()

const {
    getAllStats,
    getAbum,
    getArtists,
    getGenres
} = require('../controller/statController');

Router.get('/', getAllStats)
Router.get('/genres', getGenres)
Router.get('/artists', getArtists)
Router.get('/albums', getAbum)


module.exports = Router