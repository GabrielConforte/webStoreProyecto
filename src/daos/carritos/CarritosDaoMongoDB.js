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
		console.log(producto)
		let objeto = await this.collection.updateOne({
			_id: id
		}, {
			$push: {
				items: producto[0]
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
		let objeto = await this.collection.updateOne({
			_id: id
		}, {
			$pull: {
				items: producto
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