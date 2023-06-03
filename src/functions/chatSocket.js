import  { server } from './server.js'
import  { Server } from 'socket.io';

const chat = [];

const io = new Server(server);


const chatSocket = io.on('connection', socket => {
  socket.broadcast.emit('alert') //envia a todos menos al cliente
  socket.emit('history', chat) //envía sólo al usuario
  socket.on('message', data => {
    chat.push({message: data}) //envia información a todos los servidores
    io.emit('history', chat)
  })
})
export default {chatSocket}