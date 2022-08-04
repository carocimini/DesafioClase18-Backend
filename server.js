const Contenedor = require("./contenedor")
const contenedor = new Contenedor('./productos.txt')

const express =require('express')
const {Router} = express

const app = express()
const routerProducts = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))


routerProducts.get('/', async (req, res) => {
    let respuesta = await contenedor.getAll()
    res.json(
        respuesta
    )
})

routerProducts.get('/:id', async (req, res) => {
    const {id} = req.params
    let respuesta = await contenedor.getByID(Number(id))
    res.json(respuesta)
})

routerProducts.post('/', async (req, res) => {
    const {titulo, precio, thumbnail} = req.body
    let respuesta = await contenedor.save({titulo, precio, thumbnail})
    res.json(respuesta)
})

routerProducts.put('/:id', async (req, res) => {
    const {id} = req.params
    const {titulo, precio, thumbnail} = req.body
    let respuesta = await contenedor.updateById(Number(id), {titulo, precio, thumbnail})
    res.json(respuesta)
})

routerProducts.delete('/:id', async (req, res) => {
    const {id} = req.params
    let respuesta = await contenedor.delete(Number(id))
    res.send(respuesta)
})

/*obtener todos los productos
app.get('/productos', async (req, res) =>{
    let allProducts = await contenedor.getAll()
    res.send(allProducts)
})

//obtener un producto random
app.get('/productoRandom', async (req, res) =>{
    let prodRandom = await contenedor.getRandom()
    res.send(prodRandom)
})*/

app.use('/api/productos', routerProducts)

const PORT = 8080
const server = app.listen(PORT, err =>{
    if (err) throw err
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err => console.log(err))