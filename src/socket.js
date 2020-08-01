const socketMap = new Map()
exports.socketMap = socketMap

const redisClient = require('./pubsub')

function setEventHandlers(io) {
  io.on('connection', (socket) => {
    let channelName = `notifications:${socket.id}`

    console.log(`Client connected [id=${socket.id}]`);

    socketMap.set(socket.id, socket)
    redisClient.subscribe(channelName)

    socket.on('disconnect', () => {
      console.info(`Client gone [id=${socket.id}]`);
      redisClient.unsubscribe(channelName)
      socketMap.delete(socket.id)
    });
  });
}

exports.setEventHandlers = setEventHandlers
