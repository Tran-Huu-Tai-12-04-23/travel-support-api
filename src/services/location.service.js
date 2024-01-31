const Location = require('../models/location.model');

const createLocation = async (req, res) => {
    try {
        const { name } = req.body;

        const existingLocation = await Location.findOne({ name });
        if (existingLocation) {
            return res.status(409).json({ message: 'Location already exists' });
        }

        const newLocation = new Location(req.body);
        await newLocation.save();

        res.status(201).json(newLocation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getLocationDetails = async (locationId) => {
    try {
        const location = await Location.findById(locationId);
        return { location };
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
};

module.exports = { createLocation, getLocations, getLocationDetails };
