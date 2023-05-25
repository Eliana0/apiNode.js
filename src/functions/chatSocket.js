const { server } = require('./server.js')
const { Server } = require('socket.io');

let chat = [];

const io = new Server(server);
const date = new Date();
const hour = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours();
const minutos = date.getMinutes();

const chatSocket = io.on('connection', socket => {
  socket.broadcast.emit('alert') //envia a todos menos al cliente
  socket.emit('history', chat) //envía sólo al usuario
  socket.on('message', data => {
    chat.push({hour: `${hour}:${minutos}`, message: data}) //envia información a todos los servidores
    io.emit('history', chat)
  })
})

module.exports= {chatSocket}