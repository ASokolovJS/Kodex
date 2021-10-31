const {Router} = require('express')
const router = Router()
const { getSinger, createSinger, updateSinger, removeSinger, cardSinger} = require('../controllers/singer/Singer-controller')

router.get('/', getSinger)

router.get('/cardSinger/:id', cardSinger)

router.post('/create', createSinger)

router.post('/update', updateSinger)

router.post('/remove', removeSinger)

module.exports = router