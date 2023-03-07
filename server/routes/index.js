const Router = require('express')
const router = new Router()

const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const ratingRouter = require('./ratingRouter')
const basketRouter = require('./basketRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/brand', brandRouter)
router.use('/type', typeRouter)
router.use('/device', deviceRouter)
router.use('/rating', ratingRouter)

module.exports = router