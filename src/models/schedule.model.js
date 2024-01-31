const mongoose = require('mongoose');
const Location = require('./location.model');
const { Schema } = mongoose;

const scheduleSchema = new Schema(
    {
        user_id: { type: String, ref: 'User' },
        current_location_index: Number,
        next_location_index: Number,
        location_schedule: [Location.schema],
    },
    {
        id: true,
        autoIndex: true,
        timestamps: true,
    },
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
