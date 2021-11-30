const express = require('express');
const dotenv = require("dotenv").config();
const request = require("request");
const { flightsRouter } = require("./Routers/flightsRouter");
const { usersRouter } = require("./Routers/userRouter");
const mmongoose = require('mongoose');
const Flight = require('./models/flight')
const User = require('./models/users');
const log = require('log-to-file');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 8080;

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dqr5f.mongodb.net/flights-db?retryWrites=true&w=majority`;

mmongoose.connect(dbURI)
    .then((result) => {
        console.log(`connected to db`)
        app.listen(port);
        console.log(`Listening to pore ${port}`)

    })
    .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));






app.use('/api/auth', usersRouter);

app.use('/api/flights', flightsRouter);

app.use((req, res) => {
    res.status(400).send('Something is broken!');
});




