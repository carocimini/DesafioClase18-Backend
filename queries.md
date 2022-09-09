### Listar todos los productos de cada coleccion
   * Mensajes: `db.mensajes.find()`
   * Productos: `db.productos.find()`

### Mostrar la cantidad de documentos almacenados en cada coleccion
   * Mensajes: `db.mensajes.countDocuments()`
   * Productos: `db.productos.countDocuments()` 

### CRUD

   * Agregar un nuevo producto a la coleccion productos: `db.productos.insertOne({titulo: "CIGARRO VILLIGER MINI DE VAINILLA", precio: 5000, thumbnail: "https://parainfernalia.com.ar/wp-content/uploads/2019/05/villiger-mini-vinilla-20.jpg"})`

   * Consula de nombre de productos que tengan:
        *  Precio menor a 1000: `db.productos.find({precio: {$lt: 1000}})`
        *  Precio entre 1000 y 3000: `db.productos.find({precio: {$gt: 1000, $lt: 3000}})`
        *  Precio mayor a 3000: `db.productos.find({precio: {$gt: 3000}})`
        *  El tercer precio mas barato: `db.productos.find().sort({precio: 1}).limit(1).skip(2)`

   * Agregar a todos los productos el campo Stock con valor 100: `db.productos.updateMany({}, {$set: {stock: 100}})`

   * Volver a 0 el stock de todos los productos con precio mayor a 4000: `db.productos.updateMany({precio: {$gt: 4000}}, {$set: {stock: 0}})`

   * Eliminar todos los productos con precio menor a 1000: `db.productos.deleteMany({precio: {$lt: 1000}})`