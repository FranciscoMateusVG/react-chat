const express = require('express')
const app = express()
const PORT = 4000

//New imports
const http = require('http').Server(app)
const cors = require('cors')
const messageResponse = require('./socketActions/message')
const typingResponse = require('./socketActions/typing')
const { newUser, removeUser } = require('./socketActions/user')

app.use(cors())

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)

  messageResponse(socket, socketIO)
  typingResponse(socket)
  newUser(socket, socketIO)

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected')
    removeUser(socket, socketIO)
    socket.disconnect()
  })
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
