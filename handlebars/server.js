const Contenedor = require("./contenedor")
const handlebars = require('express-handlebars')

const express =require('express')

const { optionsMdb } = require("./mariaDB/connection")
const { optionsSqlite } = require("./sqlite3/connection")

const knexMariaDB = require("knex")(optionsMdb)
const knexSqlite3 = require("knex")(optionsSqlite)

const contenedor = new Contenedor(knexMariaDB, "productos")
const mensajes = new Contenedor(knexSqlite3, "mensajes")

const {Server: HttpServer} = require ('http')
const {Server: IoServer} = require ('socket.io')


const app = express()
const httpServer = new HttpServer (app)
const io = new IoServer (httpServer)


app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))


io.on('connection', async (socket) => {
    let buzonChat = await mensajes.getAll()
    console.log('usuario conectado')
    const mensaje = {
        mensaje: 'ok',
        buzonChat
    }
    socket.emit('mensaje-servidor', mensaje)

    socket.on('mensaje-nuevo', async (msj, cb) => {
        buzonChat.push(msj)
        const mensaje = {
            mensaje: 'mensaje nuevo',
            buzonChat
        }

        const id = new Date().getTime()
        io.sockets.emit('mensaje-servidor', mensaje)
        cb(id)
        await mensajes.save({
            id,
            mail: msj.mail,
            mensaje: msj.mensaje,
            fecha: msj.fecha
        })
    })
})


app.engine(
    'hbs', 
    handlebars.engine({
        extname: '.hbs',  
        defaultLayout: '' ,          
        layoutsDir: __dirname + '',
        partialsDir: __dirname + '/views/partials'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views/layouts')

app.get('/', async (req, res) => {
    let respuesta = await contenedor.getAll()
        const exist = respuesta.length
        res.render("index", {
            list: respuesta,
            exist,
            catalogo: true
        })
})

app.post('/', async (req, res) => {
    const {titulo, precio, thumbnail} = req.body
    let respuesta = await contenedor.save({titulo, precio, thumbnail})
    console.log(respuesta)
    res.redirect('/')
})

const PORT = 8080
const server = httpServer.listen(PORT, err =>{
    if (err) throw err
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err => console.log(err))