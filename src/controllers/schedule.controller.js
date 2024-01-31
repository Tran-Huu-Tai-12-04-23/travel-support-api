const scheduleService = require('../services/schedule.service');

const addOrUpdateSchedule = async (req, res) => {
    try {
        const { body } = req;
        const result = await scheduleService.addOrUpdateSchedule(body);
        if (result instanceof Error) {
            res.status(500).json({ message: result.message });
        } else {
            res.status(result._id ? 200 : 201).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const nextLocation = async (req, res) => {
    try {
        const { params } = req;
        const result = await scheduleService.nextLocation(params.id);

        if (result === false) {
            res.status(404).json({ message: 'Schedule not found' });
        } else if (typeof result === 'string') {
            res.status(400).json({ message: result });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addLocationToSchedule = async (req, res) => {
    try {
        const { params, body } = req;
        const result = await scheduleService.addLocationSchedule(params.user_id, body.location_id);

        if (result === false) {
            res.status(404).json({ message: 'Schedule not found' });
        } else if (typeof result === 'string') {
            res.status(400).json({ message: result });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addOrUpdateSchedule, nextLocation, addLocationToSchedule };
