const { Router, application } = require('express');
const { flightsController } = require("../Controllers/flightsController");
const flightsRouter = new Router();
const { checkAuthenticat } = require("../Controllers/flightsController");



flightsRouter.get('/',checkAuthenticat.isAuthenticated, flightsController.getFlights);
flightsRouter.get('/:flightNumber', checkAuthenticat.isAuthenticated, flightsController.getFlight);
flightsRouter.delete('/:flightNumber', checkAuthenticat.isAuthenticated, flightsController.deleteFlight)
flightsRouter.post('/addFlight', checkAuthenticat.isAuthenticated, flightsController.addFlight)






module.exports = {flightsRouter};