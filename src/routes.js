function setRoutes(app, io) {
  app.get('/slow', async (req, res) => {
    function slowfunc() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true)
        }, 30000)
        })
      }
      value = await slowfunc()
      res.send({ result: value })
      /*
      slowfunc().then((value) => {
        res.send({result: value})
      }, (reason) => {
        res.send({result: reason})
      })
      */
  })

  app.get('/fast', (req, res) => {
    res.send({})
  })

  app.get('/connected_sockets', (req, res) => {
    res.send(Object.keys(io.sockets.connected))
  })

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
}

module.exports = setRoutes
