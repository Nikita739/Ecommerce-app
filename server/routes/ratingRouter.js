const Router = require('express')
const router = new Router()
const {Rating} = require('../models/models')
const roleMiddleware = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, async (req, res) => {
    try {
        const {userId, deviceId, rate, description} = req.body

        if(!userId || !deviceId) {
            return res.status(400).json("User ID or Device ID not provided")
        }

        if(!rate) {
            return res.status(400).json("Provide a rating value (0 - 5)")
        }

        if(Number(rate) < 1 || Number(rate) > 5) {
            return res.status(400).json("Rating must be in range from 0 to 5")
        }

        if(!description) {
            return res.status(400).json("Provide a rating description")
        }

        const rating = await Rating.create({userId, deviceId, rate, message: description})

        return res.json(rating)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const {id} = req.params
        const rating = await Rating.destroy({where: {id: id}})
        return res.json({message: "Rating deleted successfully"})
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.get('/:deviceId', async (req, res) => {
    try {
        const {deviceId} = req.params

        if(!deviceId) {
            return res.status(400).json("Please provide a deviceId E.G /rating/DEVICE_ID")
        }

        const ratings = await Rating.findAll({where: {deviceId: deviceId}})
        return res.json(ratings)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

// Check if user has already published a rating
router.post('/check', async (req, res) => {
    try {
        const {userId, deviceId} = req.body

        if(!userId || !deviceId) {
            return res.status(400).json("User ID or Device ID not provided")
        }

        const rating = await Rating.findAll({where: {userId: userId, deviceId: deviceId}})
        if(rating.length > 0) {
            return res.json({value: true})
        }
        return res.json({value: false})
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

module.exports = router