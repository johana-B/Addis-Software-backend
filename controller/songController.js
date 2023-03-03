const Music = require('../model/songModel');
const { StatusCodes } = require('http-status-codes');

const createMusic = async (req, res) => {
    const music = await Music.create(req.body);
    if (!music) {
        throw new StatusCodes.BAD_REQUEST('music cannot be created');
    }
    res.status(StatusCodes.OK).json({ music, msg: 'music is created successfully' });
};

const getAllMusic = async (req, res) => {
    const music = await Music.find({});
    if (!music) {
        throw new StatusCodes.NOT_FOUND(`there is no music `);
    }
    res.status(StatusCodes.OK).json({ music, total: music.length });
};

const getSingleMusic = async (req, res) => {
    const { id: musicID } = req.params
    const music = await Music.findById({ _id: musicID });
    if (!music) {
        throw new StatusCodes.NOT_FOUND(`no music with id${musicID}`);
    }
    res.status(201).json({ music });
};

const updateMusic = async (req, res) => {
    const { id: musicId } = req.params
    const music = await Music.findByIdAndUpdate({ _id: musicId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!music)
        throw new StatusCodes.NOT_FOUND(`no music  with id:${musicId}`);
    res.status(StatusCodes.OK).json({ music, msg: 'music is updated successfully' });

};

const deleteMusic = async (req, res) => {
    const { id: musicID } = req.params
    const music = await Music.findOneAndRemove({ _id: musicID })
    if (!music) {
        throw new StatusCodes.NOT_FOUND({ msg: `there is no music with id${musicID}` });
    }
    res.status(StatusCodes.OK).json({ music, msg: 'music is deleted successfully' });
};


module.exports = {
    createMusic,
    getAllMusic,
    getSingleMusic,
    updateMusic,
    deleteMusic,
};