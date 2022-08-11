const Contenedor = require("./contenedor")
const contenedor = new Contenedor('./productos.txt')

const express =require('express')

const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', async (req, res) => {
    res.render('pages/prodAdmin.ejs',{
        titulo: "Tabaqueria Blend&roll",
        catalogo: false
    })
})

app.get('/productos', async (req, res) => {
    let respuesta = await contenedor.getAll()
    const exist = respuesta.length
    res.render('pages/index.ejs', {
        titulo: "Tabaqueria Blend&roll",
        list: respuesta,
        exist,
    })
})

app.post('/productos/admin', async (req, res) => {
    const {titulo, precio, thumbnail} = req.body
    let respuesta = await contenedor.save({titulo, precio, thumbnail})
    console.log(respuesta)
    res.redirect('/productos')
})

const PORT = 8080
const server = app.listen(PORT, err =>{
    if (err) throw err
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err => console.log(err))