require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const router = express.Router();

const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const io = require('./util/socket').listen(server)

// const chat = require('./chat')(io)

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

const routes = require('./routes/index.js');
app.use(cors())
app.use(function(req, res, next) {
  req.io = io
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


if (environment !== 'production') {
  app.use(logger('dev'));
}

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);
  })
});

app.use('/api/v1', routes(router));
// app.use('/api/v1', (req, res, next) => {
//   res.send('Hello');
//   next();
// });

server.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;