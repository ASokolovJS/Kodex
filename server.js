const Express = require('express');
const Handlebars= require('express-handlebars');
const app = new Express()
const path = require('path');
const fs = require('fs');
const songsRouts = require('./src/routes/songs')
const singerRouts = require('./src/routes/singer')
const homeRouts = require('./src/routes/home')
const sequelize = require('./src/db/db.connection');
const morgan = require('morgan');


const hbs = Handlebars.create({
  defaultLayout: "main",
  extname: "hbs",
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(Express.urlencoded({extended: true}))

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'src/log/loging.log'), { flags: 'a' })
app.use(morgan("common", {stream: accessLogStream}))

app.use('/', homeRouts)
app.use('/singer', singerRouts)
app.use('/songs', songsRouts)



const PORT = process.env.PORT || 3000

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server has been ${PORT}`);
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start()