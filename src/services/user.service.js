const User = require('../models/user.model');

async function createUser(user) {
    try {
        const existingUser = await User.findOne({ name: user.username });
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const newUser = new User(user);
        return await newUser.save();
    } catch (error) {
        throw error;
    }
}

async function getAllUsers() {
    return await User.find();
}

async function getUserById(userId) {
    return await User.findById(userId);
}

async function updateUser(userId, updatedUser) {
    return await User.findByIdAndUpdate(userId, updatedUser, { new: true });
}

async function deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
}

async function addOrUpdateUserDetail(userId, userDetail) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.userDetail) {
            user.userDetail = userDetail;
        } else {
            user.userDetail = { ...user.userDetail, ...userDetail };
        }
        return await user.save();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addOrUpdateUserDetail,
};
