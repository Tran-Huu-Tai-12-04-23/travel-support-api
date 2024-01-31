const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema(
    {
        name: String,
        image: String,
        rating: String,
        latitude: Number,
        longitude: Number,
        description: String,
    },
    {
        timestamps: true,
        _id: true,
        autoIndex: true,
    },
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
