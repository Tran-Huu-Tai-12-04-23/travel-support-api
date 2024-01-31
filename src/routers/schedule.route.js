const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');

router.post('/schedule', scheduleController.addOrUpdateSchedule);
router.get('/schedule/:id/next-location', scheduleController.nextLocation);
router.post('/schedule/:user_id/add-location', scheduleController.addLocationToSchedule);

module.exports = router;
