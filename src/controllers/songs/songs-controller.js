const Singers = require("../../models/singerModel");
const Songs = require("../../models/songsModel");

function getName(songs, singer) {
  songs.map((i) => {
    let singers = singer.find((f) => f.id == i.singerId);
    i.singerId = singers.name;
  });
  return songs;
}

const getSongs = async (req, res) => {
  const songs = await Songs.findAll({ raw: true });
  const singer = await Singers.findAll({ raw: true });

  res.render("listSongs", {
    title: "Список песен",
    songs: getName(songs, singer),
  });
};

const createSongs = async (req, res) => {
  try {
    const singerName = await Singers.findOne({
      where: { name: req.body.name },
      raw: true,
    });
    if (!singerName) {
      const singer = await Singers.create({
        name: req.body.name,
        date: Date.now(),
      });
      await Songs.create({
        title: req.body.titleSong,
        date: Date.now(),
        singerId: singer.id,
      });
    } else {
      await Songs.create({
        title: req.body.titleSong,
        date: Date.now(),
        singerId: singerName.id,
      });
    }
    res.redirect("/songs");
  } catch (error) {
    console.log(error);
    res.redirect("/songs")
  }
};

const cardSong = async (req, res) => {
  const song = await Songs.findOne({where: {id: req.params.id }, raw: true})
  res.render("cardSong", {
    title: song.title,
    song,
  })
}

const updateSongs = async (req, res) => {
  try {
    await Songs.update({title: req.body.newTitle}, {where: {id: req.body.id}})
    res.redirect('/songs')
  } catch (error) {
    console.log(error);
    res.redirect('/songs')
  }
};

const removeSongs = async (req, res) => {
  try {
    await Songs.destroy({
      where: {
        id: req.body.songId,
      },
    });
    res.redirect("/songs");
  } catch (error) {
    console.log(error);
    res.redirect("/songs")
  }
};

module.exports = { getSongs, createSongs, updateSongs, removeSongs, cardSong };
