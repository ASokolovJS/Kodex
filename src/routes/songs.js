const {Router} = require('express')
const router = Router()
const { getSongs, createSongs, updateSongs, removeSongs, cardSong } = require('../controllers/songs/songs-controller')

router.get('/', getSongs)

router.get('/cardSong/:id', cardSong)

router.post('/create', createSongs)

router.post('/update', updateSongs)

router.post('/remove', removeSongs)

module.exports = router