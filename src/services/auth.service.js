// authService.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

async function authenticateUser(username, password) {
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }
        // Generate a JWT token
        // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        // return { user, token };

        return { user };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    authenticateUser,
};
