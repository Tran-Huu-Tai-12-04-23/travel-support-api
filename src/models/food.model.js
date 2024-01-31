const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema(
    {
        name: string,
        price: string,
        image: string,
        description: string,
        is_delete: boolean,
    },
    {
        timestamps: true,
        id: true,
        autoIndex: true,
    },
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
