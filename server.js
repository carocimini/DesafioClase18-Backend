const Contenedor = require("./contenedor")
const contenedor = new Contenedor('./productos.txt')

const express =require('express')
const app = express()

contenedor.getAll()
contenedor.getRandom()

app.get('/', (req, res) =>{
    res.send(
        "<h1>Desafio servido express</h1>"
    )
})

//obtener todos los productos
app.get('/productos', async (req, res) =>{
    let allProducts = await contenedor.getAll()
    res.send(allProducts)
})

//obtener un producto random
app.get('/productoRandom', async (req, res) =>{
    let prodRandom = await contenedor.getRandom()
    res.send(prodRandom)
})

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err => console.log(err))