import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()

const generateAccessToken  = async (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '7d' });
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
        const accessToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
        return accessToken;
    } catch (error) {
        throw error;
    }
}


export default {
    generateAccessToken,
    generateRefreshToken,
    generateAccessTokenResetPassword
}