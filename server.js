const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');


// const routes = require('./routes/homepage');
// const auth = require('./routes/auth')
// const profileRoutes = require('./routes/profileRoutes')
// const gameRoutes = require('./routes/gameRoutes')
// const registerRoute = require('./routes/registerRoute')
const helpers = require('./utils/helpers/helpers');
const hbs = exphbs.create({ helpers });
const routes = require("./controller")

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const server = require('http').createServer(app);;
const PORT = process.env.PORT || 3001;
var io = require('socket.io')(server);

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

let players = [];



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
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('homepage');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
// app.use(auth)
// app.use(profileRoutes);
// app.use(gameRoutes);
// app.use(registerRoute);



const botName = 'Moderator ';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    players.push(socket.id);
    console.log(players);

    if (players.length === 6) {
      io.emit('message', formatMessage(botName, 'Game starting.'));
    }

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Outbreak!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    players = players.filter(player => player !== socket.id);
    console.log(players);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

// io.on('connection', client => {
//   client.on('event', data => {
//       console.log(data)
//   });
//   client.on('disconnect', () => { });

//   client.on('chat', data => {
//       console.log(client.id)
//       chatHistory.push(`${client.id} said ${data}`);
//       io.emit('newChat',chatHistory);
//   })
// });

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});