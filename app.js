require('express-async-errors')
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect')
const app = express();
//routes
const musicRouter = require('./routes/songRoutes');
const statRouter = require('./routes/statRoute');
const bodyParser = require('body-parser');

const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error-handler')
app.use(express.json())
app.get('', (req, res) => {
    res.send('Addis Software project')
});
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/musics', musicRouter);
app.use('/stats', statRouter);

//middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);
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