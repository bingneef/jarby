const io = require( "socket.io" )( httpServer );

io.on('connection', (socketObject) => {
  socketObject.on('subscribe', (data) => {
    socketObject.join(data.room);
    socketObject.emit('authorized', {room: data.room});
    console.log('subscribe', JSON.stringify(data));
  });

  socketObject.on('unsubscribe', (data) => {
    socketObject.leave(data.room);
    console.log('unsubscribe', JSON.stringify(data));
  })
});

var transmit = (data) => {
  if (io.sockets) {
    io.sockets.emit('socketTransmit', data);
  }
}

module.exports = {
  io,
  transmit
}
