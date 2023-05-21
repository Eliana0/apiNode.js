const socket = io()

let chatInput = document.getElementById('chatInput')

chatInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') socket.emit('message', chatInput.value)
})

socket.on('history', data => {
    let message = "";
    data.forEach(text => {
        message += `${text.hour} ${text.message}<br>`
    });
    document.getElementById('history').innerHTML = message;
    chatInput.value = ""
})

socket.on('alert', data => {
   alert('Nuevo usuario conectado + nombre del usuario')
})