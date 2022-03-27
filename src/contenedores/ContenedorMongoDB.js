const {mongoose} = require('mongoose');
const { mongo_db } = require('../config/index.js');
const MONGO_URI = `${mongo_db.uri}/${mongo_db.name}`;

(async () => {
	try {
		await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true});
		console.log("Database conectada");
	} catch (error) {
		console.log(error);
		console.log("No se puede conectar a la base de datos");
	}
	
})();

class ContainerMongoDB {
	constructor(collection, schema) {
		this.collection = mongoose.model(collection, schema);
	}

	async getAll() {
		try {
			const data = await this.collection.find({}, {__v: 0});
			return data;
		} catch (error) {
			console.log("no se puede leer el archivo");
		}
	}

	async getById(id) {
		try {
			const data = await this.getAll();
			if (data) {
				let obj = await this.collection.find({_id: id}, {__v: 0});
				if (obj) return obj[0];
				return null;
			}
		} catch (error) {
			console.log("no se pudo leer el archivo");
		}
	}

	async save(data) {
		try {
			//haz que se pueda guardar un producto nuevo usando los datos del body
			const dataSaved = await this.collection.create(data);
			return dataSaved;
		} catch (error) {
			console.log("no se puede guardar el archivo");
		}
	}

	async editById(id, obj) {
		try {
			const dataUpdate = await this.collection.findByIdAndUpdate(id, obj, {
				new: true,
			});
			return dataUpdate;
		} catch (error) {
			console.log("no se puede editar");
		}
	}
	async delete(id) {
		try {
			const dataDeleted = await this.collection.deleteOne({_id: id});
			console.log(dataDeleted);
		} catch (error) {
			console.log("no se puede eliminar");
		}
	}
}

module.exports = ContainerMongoDB;
