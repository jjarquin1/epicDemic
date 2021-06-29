const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const game = require('./game')

////game logic
global.argv = require ('optimist')
	.boolean('custom')
	.boolean('debug')
	.boolean('wills')
	.alias('t', 'countdown')
	.argv
;

var debug = argv.debug;

var defaultCountdownTime = debug ? 3 : 10;
game.countdownTime =  defaultCountdownTime;
console.log(game.countdownTime);
////end of game logic 


// const helpers = require('./utils/helpers/helpers');
// const hbs = exphbs.create({ helpers });
const routes = require("./controller")

const sequelize = require('./config/connection');
const { checkNumPlayers, checkVictory } = require('./game');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const server = require('http').createServer(app);;
const PORT = process.env.PORT || 3001;
global.io = require('socket.io').listen(server);

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
  res.render('frontpage');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);




// Run when client connects
io.on('connection', socket => {
  socket.emit('message', { message: 'Welcome to the lobby.' });
	socket.broadcast.emit('message', { message: 'A new client has connected.' });

	//request announcement and header from the game
	socket.emit('announcement', { message: game.announcement() });
	socket.emit('header', { message: game.header() });

	socket.game_alive = false;

	

	socket.last_msg_time = Date.now();

	if(!debug) {
		if(!game.state()){
			socket.emit('message', { message: 'Please pick a nickname to register as a player.' });
			game.checkNumPlayers();
		} else {
			socket.emit('message', { message: 'The game you are trying to join has already started.' });
		}
	} else {
		socket.game_nickname = socket.id;
		socket.emit('hideNameField');
		if(!game.state()){
			game.checkNumPlayers();
		}
	}

	socket.on('disconnect', function() {
		socket.game_alive = false;
		socket.leave('alive');
		if (socket.game_nickname) {
			io.sockets.emit('message', { message: socket.game_nickname + ' has disconnected.' });
		} else {
			io.sockets.emit('message', { message: 'A client has disconnected.' });
		}
			
		checkVictory();

		if(!game.state()){
			setTimeout(function() {
				game.checkNumPlayers();
			}, 1000);
		}

	});

	socket.on('send', function (data) {
		if (socket.game_nickname) {
			if (data.message.length) {
				if (Date.now() - socket.last_msg_time > 1000) {
					data.username = socket.game_nickname;
					if (!game.state()) {
						io.sockets.emit('message', data);
					} else {
						game.filterMessage(socket, data);
					}

					socket.last_msg_time = Date.now();
				} else {
					socket.emit('message', { message: 'Please slow down your messages.'});
				}
			}
		} else {
			socket.emit('alert', { message: 'Please set a nickname.'});
		}
	});

	socket.on('vote', function (data) {
		game.vote(socket, data);
	});

	socket.on('changeNick', function (data) {
		if (data && !socket.game_nickname) {
			var isUnique = true;
			io.sockets.clients().forEach(function (socket) {
				if (data == socket.game_nickname) { //custom properties prefixed with game_ so as to not cause collisions
					isUnique = false;
				}
			});


			if (isUnique) {
				socket.game_nickname = data;
				socket.emit('hideNameField');
				if(!game.state()){
					game.checkNumPlayers();
				}
			} else {
				socket.emit('alert', { message: 'Nickname is not unique.'});
			}
		} else {
			socket.emit('alert', { message: 'Nickname is not valid.' });
		}
	});
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});