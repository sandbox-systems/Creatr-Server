var socketio = require('socket.io')

module.exports.listen = function(app){
    io = socketio.listen(app)

    messages = io.of('/messages')

    return io
}