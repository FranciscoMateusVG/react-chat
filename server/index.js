const express = require('express')
const app = express()
const PORT = 4000

//New imports
const http = require('http').Server(app)
const cors = require('cors')

app.use(cors())

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)

  //Listens and logs the message to the console
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected')
  })
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
