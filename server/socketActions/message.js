const messageResponse = (socket, socketIO) => {
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data)
  })
}

module.exports = messageResponse
