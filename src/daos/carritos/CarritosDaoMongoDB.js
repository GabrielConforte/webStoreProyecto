const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB.js");

class CarritosDaoMongoDB extends ContenedorMongoDB {
	constructor() {
		super("carritos", {
			timestamps: {type: Date},
			items: {},
		});
	}

async addProducto(id, producto){
	try {
		let carritoTemporal = await this.collection.findOne({
			_id: id
		});
		carritoTemporal.items.push(producto[0]);
		let objeto = await this.collection.updateOne({
			_id: id
		}, {
			$set: {
				items: carritoTemporal.items
			}
		});
		return objeto;
	}
	catch (error) {
		console.log(error);
	}
}

async getAllById(id){
	try {
		let objeto = await this.collection.findOne({
			_id: id
		});
		return objeto;
	}
	catch (error) {
		console.log(error);
	}
}

async deleteProducto(id, producto){
	try {
		let carritoTemporal = await this.collection.findOne({
			_id: id
		});
		let productoTemporal = carritoTemporal.items.find(item => item.id == producto);
		carritoTemporal.items.splice(carritoTemporal.items.indexOf(productoTemporal), 1);
		let objeto = await this.collection.updateOne({
			_id: id
		}, {
			$set: {
				items: carritoTemporal.items
			}
		});
	
		
		return objeto;
	}
	catch (error) {
		console.log(error);
	}
}

}

module.exports = CarritosDaoMongoDB;