const Singers = require("../../models/singerModel");
const Songs = require("../../models/songsModel");

const getSinger = async (req, res) => {
  const sing = await Singers.findAll({ raw: true });
  res.render("listSingers", {
    title: "Main Page",
    sing,
  });
};

const createSinger = async (req, res) => {
  try {
    await Singers.create({
      name: req.body.name,
      date: Date.now(),
    });
    res.redirect("/singer");
  } catch (error) {
    console.log("Запрещено");
    res.redirect("/singer");
  }
};

const cardSinger = async (req, res) => {
  const singer = await Singers.findOne({
    where: { id: req.params.id },
    raw: true,
  });
  const songsOfSinger = await Songs.findAll({
    where: { singerId: req.params.id },
    raw: true,
  });
  res.render("cardSinger", {
    title: singer.name,
    singer,
    titleSongs: songsOfSinger,
  });
};

const updateSinger = async (req, res) => {
  try {
    await Singers.update(
      { name: req.body.newName },
      { where: { id: req.body.id } }
    );
    res.redirect("/singer");
  } catch (error) {
    console.log(error);
    res.redirect("/singer");
  }
};

const removeSinger = async (req, res) => {
  try {
    await Singers.destroy({
      where: {
        id: req.body.singerId,
      },
    });
    res.redirect("/singer");
  } catch (error) {
    console.log(error);
    res.redirect("/singer");
  }
};

module.exports = {
  getSinger,
  createSinger,
  updateSinger,
  removeSinger,
  cardSinger,
};
