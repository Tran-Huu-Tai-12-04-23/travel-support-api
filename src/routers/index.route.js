const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const locationRouter = require('./location.route');
const scheduleRouter = require('./schedule.route');

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/location', locationRouter);
router.use('/schedule', scheduleRouter);

module.exports = router;
