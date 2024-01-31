const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodLocationSchema = new Schema(
    {
        food_id: { type: String, ref: 'food' },
        location_id: { type: String, ref: 'location' },
    },
    {
        timestamps: true,
        id: true,
        autoIndex: true,
    },
);

const FoodLocation = mongoose.model('FoodLocation', foodLocationSchema);

module.exports = FoodLocation;
