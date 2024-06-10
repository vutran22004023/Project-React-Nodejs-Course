import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()


const verifyResetToken = (token) => {
    return jwt.verify(token,  process.env.RESET_TOKEN);
};

export default {
    verifyResetToken
}

