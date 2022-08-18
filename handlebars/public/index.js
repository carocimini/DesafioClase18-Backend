const server = io().connect()

const render = (buzonChat) => {
    let chat = document.querySelector('#chat')
    let html = buzonChat.map(mesj => {
        return `<li>
        <strong style="color:blue">${mesj.mail}</strong>
        [<span style="color:brown">${mesj.fecha}</span>]:
        <em style="color:green">${mesj.mensaje}</em>  
        </li>`
    })
    chat.innerHTML = html.join('')
}

const addMessage = (evt) => {
    const mail = document.querySelector('#mail').value
    let hora = new Date().toLocaleTimeString()
    let dia = new Date().toLocaleDateString()
    let fecha = `${dia} ${hora}`
    const mensaje = document.querySelector('#mensaje').value

    const chatString = {mail, fecha, mensaje}
    //console.log(chatString)
    server.emit('mensaje-nuevo', chatString, id => {
        console.log(id)
    })
    return false
}


server.on('mensaje-servidor', mensaje => {
    render(mensaje.buzonChat)
})