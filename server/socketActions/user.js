let users = []

const newUser = (socket, socketIO) => {
  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    users.push(data)
    socketIO.emit('newUserResponse', users)
  })
}

const removeUser = (socket, socketIO) => {
  //Updates the list of users when a user disconnects from the server
  users = users.filter((user) => user.socketID !== socket.id)
  socketIO.emit('newUserResponse', users)
}

module.exports = { newUser, removeUser }
