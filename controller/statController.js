const Song = require("../model/songModel");
const { StatusCodes } = require('http-status-codes');
// Get the total number of songs, artists, and genres
const getAllStats = async (req, res) => {
    try {
        const totalSongs = await Song.countDocuments();
        const totalArtists = await Song.distinct('artist');
        const totalGenres = await Song.distinct('genre');
        const totalAlbum = await Song.distinct('album');

        res.status(StatusCodes.OK).json({
            totalSongs,
            totalArtists: totalArtists.length,
            totalGenres: totalGenres.length,
            totalAlbum: totalAlbum.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get the number of songs in each genre
// const getGenres = async (req, res) => {
//     try {
//         const songsByGenre = await Song.aggregate([
//             { $group: { _id: '$genre', count: { $sum: 1 } } },
//             { $sort: { count: -1 } },
//         ]);

//         res.json({ songsByGenre });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// };
const getGenres = async (req, res) => {
    try {
        const genres = await Song.distinct('genre');
        const songsByGenre = await Promise.all(genres.map(async genre => {
            const count = await Song.countDocuments({ genre });
            return { _id: genre, count };
        }));
        const sortedSongsByGenre = songsByGenre.sort((a, b) => b.count - a.count);
        res.json({ songsByGenre: sortedSongsByGenre });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get the number of songs and albums each artist has
// const getArtists = async (req, res) => {
//     try {
//         const songsByArtist = await Song.aggregate([
//             { $group: { _id: '$artist', songs: { $sum: 1 }, albums: { $addToSet: '$album' } } },
//             { $project: { _id: 0, artist: '$_id', songs: 1, albums: { $size: '$albums' } } },
//             { $sort: { songs: -1 } },
//         ]);

//         res.json({ songsByArtist });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// };
const getArtists = async (req, res) => {
    try {
        const artists = await Song.distinct('artist');
        const songsByArtist = artists.map(async (artist) => {
            const count = await Song.countDocuments({ artist });
            const albums = await Song.distinct('album', { artist });
            return { artist, songs: count, albums: albums.length };
        });

        const results = await Promise.all(songsByArtist);
        res.json({ songsByArtist: results });
    } catch (error) {
        console.error(error);

    }
}

// Get the number of songs in each album
const getAbum = async (req, res) => {
    try {
        const songsByAlbum = await Song.aggregate([
            { $group: { _id: '$album', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        res.json({ songsByAlbum });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = {
    getAllStats,
    getAbum,
    getArtists,
    getGenres
};
