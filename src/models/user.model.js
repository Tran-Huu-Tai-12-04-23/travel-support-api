const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userDetailSChema = new Schema({
    name: String,
    fullName: String,
    address: String,
    email: String,
    phoneNumber: String,
});
const userSchema = new Schema(
    {
        username: String,
        password: String,
        login_history: Date,
        userDetail: userDetailSChema,
    },
    {
        id: true,
        autoIndex: true,
        timestamps: true,
    },
);
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
