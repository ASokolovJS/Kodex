const Singers = require('../../models/singerModel')
const Songs = require('../../models/songsModel')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const getHome = (req, res) =>{
  res.render('index', {
    title: 'Главная страница'
  })
}

const getName = async (req, res) => {
 try {
  if(req.body.select == 'song'){
    const songs = await Songs.findAll({where: {
      title: {[Op.iLike]: "%" + req.body.title + "%"}
    }})
    res.send(songs)
  }else{
    const singer = await Singers.findAll({where: {
      name: {[Op.iLike]: "%" + req.body.title + "%"}
    }})
    res.send(singer)
  }
 } catch (error) {
   console.log(error);
 }
}

const getDate = async (req, res) => {
  try {
    if(req.body.select == 'song'){
      const songs = await Songs.findAll({where: {
        date: req.body.date
      }})
      res.send(songs)
    }else{
      const singers = await Singers.findAll({where: {
        date: req.body.date
      }})
      res.send(singers)
    }
  } catch (error) {
    console.log(error);
  }
}

const getAllSongs = async (req, res) => {
  try {
    let arr = (req.body.singers.replace(/[ ,]+/g, ",")).split(",")
  let idSinger = await Singers.findAll({where: {
    name: {[Op.iLike]: { [Op.any]: arr}}
  }, raw: true})
  idSinger = idSinger.map((i) => i.id)
  const songs = await Songs.findAll({where: {
      singerId: idSinger
  }, raw: true})
    res.send(songs)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {getHome, getName, getDate, getAllSongs}