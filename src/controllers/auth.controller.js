const authService = require('../services/auth.service');
const userService = require('../services/user.service');

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const { user } = await authService.authenticateUser(username, password);

        res.json({ user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}
async function register(req, res) {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    login,
    register,
};
