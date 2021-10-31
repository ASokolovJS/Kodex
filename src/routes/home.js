const {Router} = require('express')
const {getHome, getName, getDate, getAllSongs} = require('../controllers/home/home-controllers')
const router = Router()


router.get('/', getHome)

router.post('/searchByName', getName)

router.post('/searchByDate', getDate)

router.post('/searchAllSongs', getAllSongs)


module.exports = router