const socket = io()

let chatInput = document.getElementById('chatInput')

chatInput.addEventListener('keyup', e => {
    if (e.key === 'Enter'){
        const date = new Date();
        const hour = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours();
        const minutos = date.getMinutes();
        if (chatInput.value.trim().length>0) {
            const chat = ` ${hour}:${minutos}: ${chatInput.value}`
            socket.emit('message', chat)
            chatInput.value = "";
        } 
    } 
})

socket.on('history', data => {
    let message = "";
    data.forEach(text => {
        message += `${text.message}<br>`
    });
    document.getElementById('history').innerHTML = message;
    chatInput.value = ""
})

socket.on('alert', data => {
   alert('Nuevo usuario conectado + nombre del usuario')
})
