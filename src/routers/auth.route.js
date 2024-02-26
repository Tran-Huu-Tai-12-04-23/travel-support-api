const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * /example:
 *   post:
 *     summary: Get information about an example resource
 *     description: Retrieve information about an example resource.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/login', authController.login);
/**
 * @swagger
 * /example:
 *   post:
 *     summary: Get information about an example resource
 *     description: Retrieve information about an example resource.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/register', authController.register);

module.exports = router;
