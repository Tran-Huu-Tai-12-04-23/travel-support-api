const locationService = require('../services/location.service');

const createLocation = async (req, res) => {
    const { body } = req;

    const result = await locationService.createLocation(body);

    if (result.error) {
        return res.status(409).json({ message: result.error });
    }

    res.status(201).json(result.location);
};

const getLocations = async (req, res) => {
    const result = await locationService.getLocations();

    if (result.error) {
        return res.status(500).json({ message: result.error });
    }

    res.status(200).json(result.locations);
};
const getLocationDetails = async (req, res) => {
    const { params } = req;
    const { locationId } = params;

    const result = await locationService.getLocationDetails(locationId);

    if (result.error) {
        return res.status(500).json({ message: result.error });
    }

    if (!result.location) {
        return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json(result.location);
};

module.exports = { createLocation, getLocations, getLocationDetails };
