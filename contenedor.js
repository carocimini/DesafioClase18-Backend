const fs = require('fs');

class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }

    async save(obj){
        try{
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8');
            let dataFileParse = JSON.parse(dataFile)
            
            if (dataFileParse.length > 0){
                await fs.promises.writeFile(this.ruta, JSON.stringify([ ...dataFileParse, {...obj, id: dataFileParse[dataFileParse.length-1].id + 1} ], null, 2), 'utf-8')
                return dataFileParse[dataFileParse.length-1].id + 1
            }else{
                await fs.promises.writeFile(this.ruta, JSON.stringify([{...obj, id: 1}], null, 2))
                return 1
            }
            
        }catch(error){
            console.log(error)  
        }
    }

    async getByID(id){
        try{
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataFileParse = JSON.parse(dataFile)
            let producto = dataFileParse.find(producto => producto.id === id)
            if(producto){
                return producto
            }else{
                return null
            }
        }catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try{
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataFileParse = JSON.parse([dataFile])
            if(dataFileParse){
                return dataFileParse
            }else{
                return null
            }
        }catch(error){
            console.log(error)
        }
    }

    async delete(id){
        try{
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataFileParse = JSON.parse(dataFile)
            let producto = dataFileParse.find(producto => producto.id === id)
            if(producto){
                let dataFileParseFiltrado = dataFileParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataFileParseFiltrado, null, 2))
                console.log('Se elimino el producto')  
            } else{
                console.log('No se encontro el producto')
            }
        }catch(error){
            console.log(error)
        }
    }

    async deleteAll(){try{
        let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
        let dataFileParse = JSON.parse(dataFile)
        if(dataFileParse.length){
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
            console.log('Se eliminaron todos los productos')
        }else{
            console.log('No hay productos para eliminar')
        }
    }catch(error){
        console.log(error)
    }
        
    }

    async getRandom(){
        try{
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataFileParse = JSON.parse(dataFile)
            let max = dataFileParse.length
            let min = 0
            let id = Math.ceil(Math.random()* (max - min))
            let producto = dataFileParse.find(producto => producto.id === id)
            if(producto){
                console.log(producto)
                return producto
            }else {
                console.log("sin resultados")
            }
        }catch (error){
            console.log(error)
        }
    }
}

module.exports = Contenedor