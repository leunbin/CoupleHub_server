const socketIO = require('socket.io');

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', (data) => {
      console.log(data);
      io.emit('messageResponse', data);
    });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });
};