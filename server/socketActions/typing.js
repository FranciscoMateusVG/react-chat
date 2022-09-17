let timeouts = []

const typingResponse = (socket) => {
  socket.on('typing', (data) => {
    socket.broadcast.emit('typingResponse', data)
    //Timed solution to reset typing response after a moment
    timer(socket)
  })
}

function timer(socket) {
  for (var i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i])
    timeouts.pop()
  }

  timeouts.push(
    setTimeout(() => {
      socket.broadcast.emit('typingResponse', '')
    }, 2000)
  )
}

module.exports = typingResponse
