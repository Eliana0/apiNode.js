const { server } = require('./server.js')
const { Server } = require('socket.io');
const io = new Server(server);

let chat = [];

const chatSocket = io.on('connection', socket => {

  socket.broadcast.emit('alert') //envia a todos menos al cliente
  socket.emit('history', chat) //envía sólo al usuario
  socket.on('message', data => {
    chat.push({/* hour: `${hour}:${minutos}` */ message: data}) //envia información a todos los servidores
    io.emit('history', chat)
  })
})

exports.default= {chatSocket}