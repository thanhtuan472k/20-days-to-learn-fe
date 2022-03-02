const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
const authController = {
    // Register
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });

            // Save to DB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // Generate access token
    generateAccessToken: user => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '2h' }
        );
    },

    // Generate refresh token
    generateRefreshToken: user => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '60d' }
        );
    },

    // Login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json('Wrong username');
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res.status(404).json('Wrong password');
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false, // deploy change false -> true
                    path: '/',
                    sameSite: 'strict'
                });

                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        // take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(401).json('You are not authenticated');
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid');
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter(
                token => token !== refreshToken
            );
            // Create new accesstoken, refresh token
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false, // deploy change false -> true
                path: '/',
                sameSite: 'strict'
            });
            return res.status(200).json({ accessToken: newAccessToken });
        });
    },

    logoutUser: async (req, res) => {
        res.clearCookie('refreshtoken');
        refreshTokens = refreshTokens.filter(
            token => token !== req.cookies.refreshToken
        );
        return res.status(200).json('Logout success');
    }
};

// store token
// 1. localStorage - XSS
// 2. HTTPONLY cookies - CSRF - fix SAMPSITE
// 3. Redux store -> accesstoken
//  HTTPONL cookies -> refreshtoken

// BFF PATTERN (Backend for Frontend)
module.exports = authController;
