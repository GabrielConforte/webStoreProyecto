const {promises} = require("fs");
const fs = promises;

const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class CarritosDaoArchivo extends ContenedorArchivo {
	constructor() {
		super("carts.txt");
	}

	async addProducto(id, producto) {
		let listaCarritos = await this.getAll();
		let objeto = listaCarritos.find(obj => obj.id == id);
		producto.codigo = new Date().getTime();
		if(objeto!=undefined){
			objeto.items.push(producto);
			let json = JSON.stringify(listaCarritos);
			await fs.writeFile(this.route, json);
			return objeto.title;
		}
	}
	async deleteProducto(id, productoId) {
		let listaCarritos = await this.getAll();
		let objeto = listaCarritos.find(obj => obj.id == id);
		if(objeto!=undefined){
			objeto.items = objeto.items.filter(item => item.id != productoId);
			let json = JSON.stringify(listaCarritos);
			await fs.writeFile(this.route, json);
		}
	}  
	
	async getAllById(id) {
		try {
			const cart = await this.getAll();
			let cartFind = cart.filter((element) => element.id == id);
			return cartFind
		} catch (error) {
			console.log(" a ver");
		}
	}
}

module.exports = CarritosDaoArchivo ;