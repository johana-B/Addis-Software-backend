require('express-async-errors')
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect')
const app = express();
const musicRouter = require('./routes/songRoutes');
const statRouter = require('./routes/statRoute');

app.use(express.json())
app.get('', (req, res) => {
    res.send('Addis Software project')
})
app.use(cors())


app.use('/musics', musicRouter);
app.use('/stats', statRouter);

const port = process.env.PORT || 8080;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening port ${port}... `));
    } catch (error) {
        console.log(error);
    }
};

start();