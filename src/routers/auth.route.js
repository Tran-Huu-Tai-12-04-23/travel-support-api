const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
var passport = require('passport');
const userService = require('../services/user.service');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/login/google', authController.loginWithGoogle);

/* GET /login/federated/accounts.google.com
 *
 * This route redirects the user to Google, where they will authenticate.
 *
 * Signing in with Google is implemented using OAuth 2.0.  This route initiates
 * an OAuth 2.0 flow by redirecting the user to Google's identity server at
 * 'https://accounts.google.com'.  Once there, Google will authenticate the user
 * and obtain their consent to release identity information to this app.
 *
 * Once Google has completed their interaction with the user, the user will be
 * redirected back to the app at `GET /oauth2/redirect/accounts.google.com`.
 */
router.get('/login-with-google', passport.authenticate('google'));

/*
    This route completes the authentication sequence when Google redirects the
    user back to the application.  When a new user signs in, a user account is
    automatically created and their Google account is linked.  When an existing
    user returns, they are signed in to their linked account.
*/
router.get('/login-with-google', passport.authenticate('google'));
router.get(
    '/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, profile) => {
            req.user = {
                id: profile?.id,
                ...profile?._json,
            };
            next();
        })(req, res, next);
    },
    async (req, res) => {
        const existUser = await userService.getUserByUsername(req.user.id);

        if (existUser) {
            res.redirect('/api/auth/login-with-google/success');
        } else {
            const newUser = {
                username: req.user?.id,
                password: req.user?.id,
                avatar: req.user?.picture,
                userDetail: {
                    ...req.user,
                },
            };

            try {
                await userService.createUser(newUser);
                res.redirect('/api/auth/login-with-google/success');
            } catch (err) {
                console.log(err);
                res.redirect('/api/auth/login-with-google/failed');
            }
        }
    },
);

router.get('/login-with-google/success', (req, res) => {
    res.status(200).json({
        message: 'Login successfully!',
    });
});

router.get('/login-with-google/failed', (req, res) => {
    res.status(404).json({
        message: 'Login failed!',
    });
});

module.exports = router;
