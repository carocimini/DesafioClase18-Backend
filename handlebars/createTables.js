const { optionsMdb } = require("./mariaDB/connection")
const { optionsSqlite } = require("./sqlite3/connection")

const knexMariaDB = require("knex")(optionsMdb)
const knexSqlite3 = require("knex")(optionsSqlite)

const products = [
    {
        "titulo": "Tabaco Flandria Sauvage",
        "precio": 850,
        "thumbnail": "https://parainfernalia.com.ar/wp-content/uploads/2017/08/flandria-sauvage-tabaco-venta.jpg"
    },
    {
        "titulo": "Tabaco Flandria Vainilla",
        "precio": 850,
        "thumbnail": "https://parainfernalia.com.ar/wp-content/uploads/2017/08/flandria-tabaco-vainilla-fumador.jpg"
    },
    {
        "titulo": "Tabaco Flandria Black",
        "precio": 850,
        "thumbnail": "https://parainfernalia.com.ar/wp-content/uploads/2017/08/flandria-tabaco-negro-grow-shop.jpg"
    },
    {
        "titulo": "Tabaco Pueblo Azul",
        "precio": 807,
        "thumbnail": "https://www.distribuidorapop.com.ar/wp-content/uploads/2017/05/pueblo-azul-tabaco-venta.jpg"
    }
]

// **-- Productos --**

const tablaProductos = "productos"

const batchMariaDB = async () => {
	try {
		console.log("Creando tabla de Productos...")
		await knexMariaDB.schema.createTable(tablaProductos, table => {
			table.increments("id")
			table.string("titulo")
			table.integer("precio")
			table.string("thumbnail")
		})
		await knexMariaDB(tablaProductos).insert(products)
        console.log("Insertando productos...")
	} catch (error) {
		console.log(`error creando tabla ${error}`)
	} finally {
		knexMariaDB.destroy()
	}
}

// **-- Mensajes --**

const messages = [
    {
        "mail": "caro.cimini@gmail.com",
        "mensaje": "probando mensajeria",
        "fecha": "18/8/2022 13:25:44"
    },
    {
        "mail": "rami.cimini@gmail.com",
        "mensaje": "probando fecha",
        "fecha": "18/8/2022 13:26:17"
    },
    {
        "mail": "andrius.alf@gmail.com",
        "mensaje": "ultima prueba",
        "fecha": "31/8/2022 19:57:29"
    }
]

const tablaMensajes = "mensajes"

const batchSqlite3 = async () => {
	try {
		console.log("Creando tabla Mensajes...")
		await knexSqlite3.schema.createTable(tablaMensajes, table => {
			table.increments("id")
			table.string("mail")
			table.string("mensaje")
            table.float("fecha")
		})

		console.log("Insertando mensajes...")
		await knexSqlite3(tablaMensajes).insert(messages)
	} catch (error) {
		console.log(error)
	} finally {
		knexSqlite3.destroy()
	}
}

batchMariaDB()
batchSqlite3()