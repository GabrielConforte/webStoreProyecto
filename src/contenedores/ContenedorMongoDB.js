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
			
			const data = await this.collection.find({"_id": id});
			return data;
		} catch (error) {
			console.log("no se pudo leer el archivo");
		}
	}

	async save(objeto) {
		try {
			console.log(objeto)
			await this.collection.create(objeto);
			return objeto.title;
		} catch (error) {
			//si sale error de duplicado evitar que se guarde
			if (error.code == 11000) {
				return "El objeto ya existe";
			}else{
				console.log("no se puede guardar el archivo ->" + error);
			}
			
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
			const data = await this.collection.findByIdAndDelete(id);
			return data.title;
		} catch (error) {
			console.log("no se puede eliminar");
		}
	}

	async add(data) {
		try {
			await this.collection({...data, timestamps: new Date()}).save();
		} catch (error) {
			console.log("no se puede crear");
		}
	}
}

module.exports = ContainerMongoDB;
