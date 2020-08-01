const redis = require('redis');
const { socketMap } = require('./socket')

const redisClient = redis.createClient();

redisClient.on('error', function(error) {
  console.error(error);
});

// redisClient.set("key", "value", 'EX', 60, console.log);
// redisClient.get("key", console.log);

redisClient.on('message', (channel, message) => {
  console.log('Message: ' + message + ' on channel: ' + channel + ' arrived!')
  let channelPrefix = 'notifications:'
  if (!channel.startsWith(channelPrefix)) {
    return
  }
  let socket = socketMap.get(channel.replace(channelPrefix, '')) // lookup socket id in sockets map
  if (socket === undefined) {
    return
  }
  socket.emit('notification', message)
  console.log(`Event "notification" emitted to socket ${socket.id} with payload ${message}`)
});

module.exports = redisClient
