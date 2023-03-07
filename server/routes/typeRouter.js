const Router = require('express')
const {Type} = require("../models/models");
const router = new Router()
const roleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/',  roleMiddleware('ADMIN'), async (req, res) => {
    try {
        const body = req.body
        if(!body.name) {
            return res.status(400).json("Name field can't be empty")
        }
        const type = await Type.create({ name: body.name });
        return res.json(type)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const types = await Type.findAll()
        return res.json(types)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(400).json("Provide a valid ID")
        }
        const type = await Type.findOne({where: {id: id}})
        return res.json(type)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

module.exports = router