let cors = require('cors');//
let bodyParser = require('body-parser');

const express = require('express')
const app = express ()

const mongoose = require('mongoose')
const url = 'mongodb://admin:admin123@cluster0-shard-00-00.u1nr6.mongodb.net:27017,cluster0-shard-00-01.u1nr6.mongodb.net:27017,cluster0-shard-00-02.u1nr6.mongodb.net:27017/animalDB?ssl=true&replicaSet=atlas-plrw3i-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const dbcon = mongoose.connection



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(cors()); //
dbcon.on('error', (error) => console.error(error))
dbcon.once('open', () => console.log('Database Connected...'))

app.use(express.json())
app.use(cors()); //


const animalRouter = require('./routers/animals')
app.use('/animals', animalRouter)

const indexRouter = require('./routers/index')
app.use('/', indexRouter)

// Create a server to listen at port 8080
const port = process.env.PORT || 8080;
app.listen(port,() => console.log("Animal API listening at localhost %s ", port));

// // Populate dummy data
// const fs = require('fs');
// const animal = require('./models/animal')
// let animalData = fs.readFileSync('animalinShelter.json');
// let animals = JSON.parse(animalData);
// animal.insertMany(animals)
//