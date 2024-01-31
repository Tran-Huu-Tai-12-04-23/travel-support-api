const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

router.post('/api/locations', locationController.createLocation);
router.get('/api/locations', locationController.getLocations);
router.get('/api/locations/:locationId', locationController.getLocationDetails);

module.exports = router;
