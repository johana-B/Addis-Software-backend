const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const musicSchema = mongoose.model('music', MusicSchema);
module.exports = musicSchema;