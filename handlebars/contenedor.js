class Contenedor {
	constructor(knex, tabla) {
		this.knex = knex
		this.tabla = tabla
	}

	// Guardar objeto (producto o mensaje)
	async save(obj) {
		try {
			await this.knex(this.tabla).insert(obj)
			return { message: "Se agrego el producto" }
		} catch (error) {
			console.log(`Error al guardar el producto: ${error}`)
		}
	}

	// Buscar producto por id
	async getById(id) {
		try {
			let item = await this.knex.from(this.tabla).select("*").where({ id: id })
			return item[0]
		} catch (error) {
			console.log(`Error al buscar el producto: ${error}`)
		}
	}

	//Buscar todos los productos
	async getAll() {
		try {
			let items = await this.knex.from(this.tabla).select("*")
			return items
		} catch (error) {
			console.log(error)
		}
	}

	async updateById(id, product) {
		try {
			console.log(product)
			await this.knex
				.from(this.tabla)
				.where({ id: id })
				.update({ ...product })
			return { message: "Se actualizo el producto" }
		} catch (error) {
			console.log(`Error al actualizar el producto: ${error}`)
		}
	}

	// Eliminar producto por id
	async deleteById(id) {
		try {
			await this.knex.from(this.tabla).where({ id: id }).del()
			return { message: "Item eliminado" }
		} catch (error) {
			console.log(`Error al eliminar el item: ${error}`)
		}
	}

	// Eliminar todos los productos
	async deleteAll() {
		try {
			await this.knex.from(this.tabla).del()
			return { message: "Se eliminaron todos los productos" }
		} catch (error) {
			console.log(`Error al eliminar los productos: ${error}`)
		}
	}
}

module.exports = Contenedor