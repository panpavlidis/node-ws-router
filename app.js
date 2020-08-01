const port = 3055

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const setRoutes = require('./src/routes')
const { setEventHandlers } = require('./src/socket')

setRoutes(app, io)
setEventHandlers(io)

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
