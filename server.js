const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controller/api');
const homeRoutes = require('./controller/homeRoutes')
const gameRoutes = require('./controller/gameRoutes')
// const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const server = require('http').Server(app);
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
// const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use(homeRoutes);
app.use(gameRoutes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});