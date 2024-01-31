const Schedule = require('../models/schedule.model');

const findScheduleByUserId = async (userId) => {
    return await Schedule.findOne({ user_id: userId });
};

const addOrUpdateSchedule = async (body) => {
    try {
        const existingSchedule = await findScheduleByUserId(body.user_id);

        if (existingSchedule) {
            return await Schedule.findOneAndUpdate({ user_id: body.user_id }, body, { new: true });
        } else {
            const newSchedule = new Schedule({
                ...body,
                current_location_index: 0,
                next_location_index: -1,
            });
            await newSchedule.save();
            return newSchedule;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

const nextLocation = async (id) => {
    try {
        const existingSchedule = await findScheduleByUserId(id);
        if (!existingSchedule) return false;

        const schedule = existingSchedule.location_schedule;
        if (
            existingSchedule.current_location_index >= schedule.length - 1 ||
            existingSchedule.next_location_index === -1
        ) {
            return 'Location next not exist in schedule!';
        }
        const newSchedule = {
            ...existingSchedule,
            current_location: existingSchedule.next_location_index,
            next_location:
                schedule.length - 1 > existingSchedule.current_location_index
                    ? existingSchedule.current_location_index + 1
                    : -1,
        };

        return await Schedule.findByIdAndUpdate(existingSchedule._id, newSchedule, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

const addLocationSchedule = async (user_id, location_id) => {
    try {
        const existingSchedule = await findScheduleByUserId(user_id);
        if (!existingSchedule) {
            return false;
        }
        const locationToAdd = await Location.findById(location_id);
        if (!locationToAdd) {
            return false;
        }

        const schedule = existingSchedule.location_schedule;

        const isLocationAlreadyInSchedule = schedule.some(
            (scheduleItem) => scheduleItem._id.toString() === locationToAdd._id.toString(),
        );

        if (isLocationAlreadyInSchedule) {
            return 'Location already in schedule!';
        }

        const newScheduleLocation = [...existingSchedule.location_schedule, locationToAdd];

        if (
            existingSchedule.current_location_index >= schedule.length - 1 ||
            existingSchedule.next_location_index === -1
        ) {
            return 'Location next not exist in schedule!';
        }

        const newSchedule = {
            ...existingSchedule,
            schedule_location: newScheduleLocation,
            current_location_index: existingSchedule.next_location_index,
            next_location_index:
                newScheduleLocation.length - 1 > existingSchedule.current_location_index
                    ? existingSchedule.current_location_index + 1
                    : -1,
        };
        // Save the updated schedule
        return await Schedule.findByIdAndUpdate(existingSchedule._id, newSchedule, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
};

module.exports = { findScheduleByUserId, addOrUpdateSchedule, nextLocation, addLocationSchedule };
