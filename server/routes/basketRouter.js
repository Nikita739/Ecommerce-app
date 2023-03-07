const Router = require('express')
const router = new Router()
const {Basket, BasketItem} = require('../models/models')
const { Op } = require("sequelize");
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add', authMiddleware, async (req, res) => {
    try {
        const {userId, item} = req.body

        if(!userId || !item) {
            return res.status(400).json({error: "User ID or item not provided"})
        }

        const basketItem = await BasketItem.create({userId: userId, item: item})
        return res.json(basketItem)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        // ID stands for User ID
        const {id} = req.params
        let {page, limit} = req.query
        page = Number(page)
        limit = Number(limit)

        if(!id) {
            return res.status(400).json("No id provided")
        }

        const offset = page * limit - limit

        const items = await BasketItem.findAndCountAll({where: {userId: id}, limit: limit, offset: offset})

        return res.json(items)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.get('/:id/total', authMiddleware, async (req, res) => {
    try {
        // ID stands for User ID
        const {id} = req.params

        if(!id) {
            return res.status(400).json("No id provided")
        }

        let total = 0

        const items = await BasketItem.findAll({where: {userId: id}})
        items.forEach(item => {
            total += Number(item.item.price)
        })

        return res.json({total: total})
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

router.delete('/remove', authMiddleware, async (req, res) => {
    try {
        const {userId, id} = req.body

        if(!userId || !id) {
            return res.status(400).json("Provide a user id")
        }

        const item = await BasketItem.findOne({where: {id: id}})

        if(item) {
            await item.destroy()
        }

        return res.json({message: "Success"})
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

module.exports = router