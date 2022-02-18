
const fs = require('fs');
const archivoTxt = 'carrito.txt';

class Carrito {
        
        async createCarrito() {
            let listaCarritos = await this.getAll();
            listaCarritos = JSON.parse(listaCarritos);
            let max = listaCarritos.reduce((a,b) => a.id > b.id ? a:b, {id: 0} )
            let carrito = {
                id: max.id + 1,
                timestamp: new Date(),
                items: []
            }
            listaCarritos.push(carrito);
            let json = JSON.stringify(listaCarritos);
            await fs.promises.writeFile(archivoTxt, json);
            return carrito.id;

        }

        async deleteAllbyId(id) {
            let carrito = await this.getAll();
            carrito = JSON.parse(carrito);
            carrito = carrito.filter(obj => obj.id != id);
            let json = JSON.stringify(carrito);
            fs.promises.writeFile(archivoTxt, json);
            console.log('carrito eliminado');
        }
        
        async getAll() { if (!fs.existsSync(archivoTxt)) {
            fs.promises.writeFile(archivoTxt, '[]');
        }try{
            let dato = await fs.promises.readFile(archivoTxt, 'utf8')
            return dato;
        }catch(error){
            console.log(error);
        }
        }

     
        async addProducto(id, producto) {
            let listaCarritos = await this.getAll();
            listaCarritos = JSON.parse(listaCarritos);
            let objeto = listaCarritos.find(obj => obj.id == id);
            if(objeto!=undefined){
                objeto.items.push(producto);
                let json = JSON.stringify(listaCarritos);
                await fs.promises.writeFile(archivoTxt, json);
                return objeto.title;
            }
        }

        async deleteProducto(id, productoId) {
            let listaCarritos = await this.getAll();
            listaCarritos = JSON.parse(listaCarritos);
            let objeto = listaCarritos.find(obj => obj.id == id);
            if(objeto!=undefined){
                objeto.items = objeto.items.filter(item => item.id != productoId);
                let json = JSON.stringify(listaCarritos);
                await fs.promises.writeFile(archivoTxt, json);
            }
        }  
        
        async getAllbyId(id) {
            let carrito = await this.getAll();
            carrito = JSON.parse(carrito);
            carrito = carrito.filter(obj => obj.id == id);
            return carrito;
        }

    }

    module.exports = {
        createCarrito: Carrito.prototype.createCarrito,
        deleteAllbyId: Carrito.prototype.deleteAllbyId,
        getAll: Carrito.prototype.getAll,
        addProducto: Carrito.prototype.addProducto,
        deleteProducto: Carrito.prototype.deleteProducto,
        getAllbyId: Carrito.prototype.getAllbyId
    }