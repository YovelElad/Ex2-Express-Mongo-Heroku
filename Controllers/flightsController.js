const Flight = require('../models/flight');
const User = require('../models/users');
const request = require("request");
const dotenv = require("dotenv").config();
const log = require('log-to-file');
const jwt = require('jsonwebtoken');


exports.checkAuthenticat = {
    isAuthenticated(req, res, next) {
        const authToken = req.headers["authorization"]
        const token = authToken && authToken.split(' ')[1];
        if(!token) {
            log("Check Authorization - denied!","logs.txt");
            res.send("Permission denied");
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if(err) {
                log("Check Authorization - denied!","logs.txt");
                res.send("Permission denied");
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
            });
    },

    getFlight(req, res) {
        const query = { _id: req.params.flightNumber };
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
                res.send("Wrong Flight Number");
            });
    },

    deleteFlight(req, res) {
        const query = { _id: req.params.flightNumber };
        Flight.findByIdAndDelete(req.params.flightNumber)
            .then((result) => {
                log("DELETE a specific flight - success","logs.txt");
                res.send("The flight was deleted!");
            })
            .catch((err) => {
                log("DELETE a specific flight - failure","logs.txt");
                res.send("Flight not found.");
            });

    },

    addFlight(req, res) {
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
                res.send(   `ERROR:
                            Make sure you provide all details:
                            destination
                            origin
                            date`)
            });
    },
    
    editFlight(req,res) {
        const flightNumber = req.params.flightNumber;
        Flight.findByIdAndUpdate(flightNumber, {
            destination: req.body.destination,
            origin: req.body.origin,
            date: req.body.date
        }, function(err,result) {
            if(err) {
                log("PUT update flight - failure","logs.txt");
            }
            log("PUT update flight - success","logs.txt");
            res.send(`flight ${flightNumber} updated`);
        })
    }
}

