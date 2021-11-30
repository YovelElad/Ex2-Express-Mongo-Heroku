const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    destination: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }

});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;