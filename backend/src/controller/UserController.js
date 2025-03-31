const UserService = require('../service/UserService')
const JwtService = require('../service/jwtService')
const { default: mongoose } = require('mongoose');

const loginUser = async (req, res) => {
    const { email, password } = req.body
    // console.log("data", req.body)
    
    try {
        const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(404).json({
                status: "ERR",
                message: "All field is required!"
            })
        } else if (!isCheckEmail) {
            return res.status(404).json({
                status: "ERR",
                message: "Invalid email!"
            })
        }
        const response = await UserService.loginUser(req.body)

        if (response.status === 'ERR') {
            return res.status(401).json({ // 401 Unauthenticated
                status: 'ERR',
                message: 'Incorrect email or password'
            });
        }
        console.log('responseController', response)
        const { refresh_token, ...newReponse } = response.data
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({...newReponse, refresh_token})
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}

const refreshToken = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                status: 'ERR',
                message: 'The token is required'
            });
        }

        const tokenParts = req.headers.authorization.split(' ');
        console.log("tokenParts", tokenParts)
        console.log("tokenPartslength", tokenParts.length)
        console.log("tokenParts[0]", tokenParts[0])
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({
                status: 'ERR',
                message: 'Invalid token format'
            });
        }

        let token = tokenParts[1];
        const response = await JwtService.refreshTokenJwtService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
            message: e.message
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
            return res.status(200).json({
                status: 'OK',
                message: 'Logout successfully'
            })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body
    console.log("files controller", req.files)
    const files = req.files
    try {
        const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isCheckEmail = reg.test(email);

        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(404).json({
                status: "ERR",
                message: "All field is required!"
            })
        } else if (!isCheckEmail) {
            return res.status(404).json({
                status: "ERR",
                message: "Invalid email!"
            })
        }
        const response = await UserService.createUser(req.body, files)

        return res.status(200).json(response)
        
    } catch (error) {
        console.log("error controller", error)
        console.error(error)
    }

    
}


const updateUser = async (req, res) => {
    const userId = req.params.id
    const { email, ...data } = req.body
    const files = req.files
    if (!userId || !data) {
        return res.status(404).json({
            status: "ERR",
            message: "All fields is required!"
        })
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid user ID!"
        });
    }

    if (email) {
        const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isCheckEmail = reg.test(email);
    
        if (!isCheckEmail) {
            return res.status(404).json({
                status: "ERR",
                message: "Invalid email!"
            })
        }
    }

    try {
        const updateData = { ...data };
        const response = await UserService.updateUser(userId, updateData, files)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

const getDetailsUser = async (req, res) => {
    const userId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid userId!"
        })
    }

    if (userId) {
        try {
            const response = await UserService.getDetailsUser(userId)
            if (response) {
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    } else {
        return res.status(404).json({
            status: 'ERR',
            message: 'The userId is required'
        })
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({
            status: "ERR",
            message: "Invalid userId!"
        })
    }


    if (userId) {
        try {
            const response = await UserService.deleteUser(userId)
            if (response) {
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    } else {
        return res.status(404).json({
            status: 'ERR',
            message: 'The userId is required'
        })
    }
}


const getAllUser = async (req, res) => {
    const { limit, page, filter } = req.query
    try {
        const response = await UserService.getAllUser(Number(limit), Number(page), filter)
        if (response) {
            return res.status(200).json(response)
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    loginUser,
    refreshToken,
    logoutUser,
    createUser,
    updateUser,
    getDetailsUser,
    deleteUser,
    getAllUser
}