const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

generateAccessToken = async(payload) => {
    return jwt.sign({...payload}, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
}


generateRefreshToken = async(payload) => {
    return jwt.sign({...payload}, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
            if (err) {
                console.error('JWT Verification Error:', err.message);
                resolve({
                    status: 'ERR',
                    message: 'Invalid or expired token'
                });
            } else {
                try {
                    const access_token = await generateAccessToken({
                        id: user.id,
                        role: user.role
                    });
                    resolve({
                        status: 'OK',
                        message: 'Success',
                        access_token
                    });
                } catch (e) {
                    console.error('Access Token Generation Error:', e.message);
                    reject({
                        status: 'ERR',
                        message: 'Failed to generate access token'
                    });
                }
            }
        });
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenJwtService
}