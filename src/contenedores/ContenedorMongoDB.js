const { mongo_db } = require('../config/index.js');
const MONGO_URI = `${mongo_db.uri}/${mongo_db.name}`;

(async () => {
	try {
		await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true});
		console.log("Database Connected");
	} catch (error) {
		console.log(error);
		console.log("Failed to connect to Database");
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
			console.log("The file cannot be read.");
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
			console.log("The file cannot be read.");
		}
	}

	async save(data) {
		try {
			await this.collection({...data, timestamps: new Date()}).save();
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}

	async editById(id, obj) {
		try {
			const dataUpdate = await this.collection.findByIdAndUpdate(id, obj, {
				new: true,
			});
			return dataUpdate;
		} catch (error) {
			console.log("The file cannot be written.");
		}
	}
	async delete(id) {
		try {
			const dataDeleted = await this.collection.deleteOne({_id: id});
			console.log(dataDeleted);
		} catch (error) {
			console.log("The file cannot be deleted.");
		}
	}
}

module.exports = ContainerMongoDB;
