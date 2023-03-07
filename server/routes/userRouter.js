const Router = require('express')
const router = new Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const authMiddleware = require('../middleware/authMiddleware')

const createJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

router.post('/registration', async (req, res) => {
    try {
        const {email, password, role, nickname} = req.body

        if(!email || !password || !nickname) {
            return res.status(400).json("Email, password or nickname not specified")
        }

        const userExists = await User.findOne({where: {email}})

        if(userExists) {
            return res.status(400).json("User with this email already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 4)
        const user = await User.create({email, password: hashedPassword, role, nickname})
        const basket = await Basket.create({userId: user.id})

        const token = createJwt(user.id, user.email, user.role)
        return res.json({token})
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json("Email or password not specified")
        }

        const user = await User.findOne({where: {email: email}})

        if(!user) {
            return res.status(400).json("User not found")
        }

        const compare = bcrypt.compareSync(password, user.password)

        if(!compare) {
            return res.status(400).json("Incorrect password")
        }

        const token = createJwt(user.id, user.email, user.role)
        return res.json({token})
    } catch (e) {
        return res.status(500).json({caught: e.message})
    }
})

// Check if user is authenticated
router.get('/auth', authMiddleware, (req, res) => {
    try {
        const oldUser = req.user
        const newToken = createJwt(oldUser.id, oldUser.email, oldUser.role)
        res.json({token: newToken})
    } catch (e) {
        return res.status(500).json({caught: e.message})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params

        if(!id) {
            return res.status(400).json("No ID provided")
        }

        const user = await User.findOne({where: {id: id}})
        if(!user) {
            return res.json("User not found")
        }

        return res.json(user)
    } catch (e) {
        return res.status(500).json({caught: e.message})
    }
})

module.exports = router