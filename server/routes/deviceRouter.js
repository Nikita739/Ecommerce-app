const Router = require('express')
const {Device, Rating} = require("../models/models");
const uuid = require('uuid')
const path = require('path')
const router = new Router()
const roleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', roleMiddleware('ADMIN'), async (req, res) => {
    try {
        const {name, price, brandId, typeId, info, img} = req.body
        const device = await Device.create({name, price, brandId, typeId, img, info})
        return res.json(device)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

// If user added rating, then this function is called
router.post('/recalculate-rating', async (req, res) => {
    try {
        const {deviceId} = req.body

        if(!deviceId) {
            return res.status(400).json("Provide a valid device id")
        }

        const ratings = await Rating.findAndCountAll({where: {deviceId: deviceId}})
        const device = await Device.findOne({where: {id: deviceId}})

        if(!device) {
            return res.status(400).json("No device with this ID found")
        }

        const count = ratings.count
        const rows = ratings.rows

        let rate = 0

        rows.forEach((el) => {
            rate += el.rate
        })

        device.rating = Math.round(rate / count)

        await device.save()

        return res.json(device)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.get('/', async (req, res) => {
    try {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 5
        const offset = page * limit - limit

        let devices = []

        if(!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit: limit, offset: offset})
        }
        else if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId: brandId}, limit: limit, offset: offset})
        }
        else if(typeId && !brandId) {
            devices = await Device.findAndCountAll({where: {typeId: typeId}, limit: limit, offset: offset})
        }
        else if(typeId && brandId) {
            devices = await Device.findAndCountAll({where: {typeId: typeId, brandId: brandId}, limit: limit, offset: offset})
        }

        return res.json(devices)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const deviceId = req.params.id
        if(!deviceId) {
            return res.status(400).json("ID parameter was not specified")
        }
        const device = await Device.findOne({
            where: {id: deviceId}
        })
        return res.json(device)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

module.exports = router