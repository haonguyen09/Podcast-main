const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const routes = require('./routes')
const cors = require('cors')
const path = require("path");
const Podcast = require("./model/PodcastModel")

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, 
    optionsSuccessStatus: 200,
}))
app.use(bodyParser.json())
app.use(cookieParser())

//Routes
routes(app)
const port = process.env.PORT || 3005

mongoose.connect(`${ process.env.MONGO_DB }`)
    .then(() => { console.log('Connected database!'); preloadData(); })
    .catch((e) => console.log('Not connect database', e))


const preloadData = async () => {
    try {
        const data = await Podcast.find(); 
        app.locals.preloadedData = data; 
    } catch (error) {
        console.error('Error preloading data:', error);
    }
};


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})