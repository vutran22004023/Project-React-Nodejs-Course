import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()

const generateAccessToken  = async (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '15m' });
        return accessToken;
    } catch (error) {
        throw error;
    }
}

const generateAccessTokenResetPassword  = async (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.RESET_TOKEN, { expiresIn: '5m' });
        return accessToken;
    } catch (error) {
        throw error;
    }
}

const generateRefreshToken  = async (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
        return accessToken;
    } catch (error) {
        throw error;
    }
}

const refreshAccessToken = (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            status: 'ERR',
            message: 'Không có refreshToken được cung cấp',
        });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'ERR',
                message: 'RefreshToken không hợp lệ',
            });
        }

        // Generate new access token
        const accessToken = generateAccessToken(user.id, user.isAdmin);

        // Set the new accessToken in a cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000 // 15 minutes in milliseconds
        });

        // Return new access token to client
        res.json({
            accessToken: accessToken,
        });
    });
};


export default {
    generateAccessToken,
    generateRefreshToken,
    generateAccessTokenResetPassword,
    refreshAccessToken
}