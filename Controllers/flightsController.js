const Flight = require('../models/flight');
const User = require('../models/users');
const request = require("request");
const dotenv = require("dotenv").config();
const log = require('log-to-file');
const jwt = require('jsonwebtoken');


exports.checkAuthenticat = {
    isAuthenticated(req, res, next) {
        console.log("Checking Authorization");
        const authToken = req.headers["authorization"]
        console.log(`authoToken: ${authToken}`);
        const token = authToken && authToken.split(' ')[1];
        if(!token) {
            log("Check Authorization - denied!","logs.txt");
            res.send("Permission denied");
        }
        console.log(token);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if(err) {
                log("Check Authorization - denied!","logs.txt");
                res.send("permission denied");
            }
            log("Check Authorization - aproved!","logs.txt");
            next();
        });
    }
}



exports.flightsController = {
    getFlights(req, res) {
        Flight.find()
            .then((result) => {
                log("GET all flights - success","logs.txt");
                res.send(result);
            })
            .catch((err) => {
                log("GET all flights - failure","logs.txt");
                console.log(err);
            });
    },

    getFlight(req, res) {
        console.log("Get a flight");
        const query = { _id: req.params.flightNumber };
        console.log(query);
        Flight.find(query)
            .then((result) => {
                log("GET a specific flight - success","logs.txt");
                url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${result[0]["destination"]}/${result[0]["date"]}?unitGroup=us&key=${process.env.API_NEW_KEY}`
                request(url, function (error, response, body) {
                    res.send(`Flight Number: ${result[0]["_id"]}
                            Destination: ${result[0]["destination"]}
                            Origin: ${result[0]["origin"]}
                            Date: ${result[0]["date"]}
                            Weather: is going to be ${JSON.parse(body).days[0].description} The temerature will be: ${JSON.parse(body).days[0].temp}F`);
                })
            })
            .catch((err) => {
                log("GET a specific flight - failure","logs.txt");
                console.log(err);
            });
    },

    deleteFlight(req, res) {
        console.log("Delete flight");
        const query = { _id: req.params.flightNumber };
        Flight.findByIdAndDelete(req.params.flightNumber)
            .then((result) => {
                log("DELETE a specific flight - success","logs.txt");
                res.send("The flight was deleted!");
            })
            .catch((err) => {
                log("DELETE a specific flight - failure","logs.txt");
                console.log(err);
            });

    },

    addFlight(req, res) {
        console.log("Adding flight");
        const flight = new Flight({
            destination: req.body.destination,
            origin: req.body.origin,
            date: req.body.date
        })
        flight.save()
            .then((result) => {
                log("POST add flight - success","logs.txt");
                res.send(`The flight was added successfuly.
                            Flight details:
                            ${result}`)
            })
            .catch((err) => {
                log("POST add flight - failure","logs.txt");
                console.log(err);
            });
    }
}

