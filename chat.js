exports = module.exports = function(io){
  io.socket.on('SEND_MESSAGE', function(data){
    io.emit('RECEIVE_MESSAGE', data);
})
}