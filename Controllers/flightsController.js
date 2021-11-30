const Flight = require('../models/flight');
const User = require('../models/users');
const request = require("request");
const dotenv = require("dotenv").config();


exports.checkAuthenticat = {
    isAuthenticated(req, res, next) {
        console.log("Checking Authorization");
        const query = { _id: req.headers["authorization"] };
        console.log(req.headers["authorization"]);
        User.find(query)
            .then((result) => {
                console.log("user Found");
                console.log(result[0]._id);
                if (result[0]._id == req.headers["authorization"])
                    next();
                else
                    res.send("Permission denied!");
            })
            .catch((err) => {
                console.log(err);
                res.send("Permission denied!");
            });
    }
}



exports.flightsController = {
    getFlights(req, res) {
        Flight.find()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
            });
    },


    getFlight(req, res) {
        console.log("Get a flight");
        const query = { _id: req.params.flightNumber };
        console.log(query);
        Flight.find(query)
            .then((result) => {
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
                console.log(err);
            });
    },

    deleteFlight(req, res) {
        console.log("Delete flight");
        const query = { _id: req.params.flightNumber };
        Flight.findByIdAndDelete(req.params.flightNumber)
            .then((result) => {
                res.send("The flight was deleted!");
            })
            .catch((err) => {
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
                res.send(`The flight was added successfuly.
                            Flight details:
                            ${result}`)
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

