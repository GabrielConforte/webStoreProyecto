//crea una conexion a firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoDbpl1MCUpikWM1PnMfctaVJPVg_7HiY",
  authDomain: "webstore-33bf7.firebaseapp.com",
  projectId: "webstore-33bf7",
  storageBucket: "webstore-33bf7.appspot.com",
  messagingSenderId: "182678863619",
  appId: "1:182678863619:web:13c780bac95333660ef336",
  measurementId: "G-LX58Q49CED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//crearemos los metodos para el manejo de firebase, getAll, getById, save, editById, delete, add, update
export default class ContenedorFirebase {
    constructor() {
        this.collection = app.firestore().collection("products");
    }
    async getAll() {
        try {
            const data = await this.collection.get();
            return data.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
        } catch (error) {
            console.log("no se puede leer el archivo");
        }
    }
    async getById(id) {
        try {
            const data = await this.collection.doc(id).get();
            return data.data();
        } catch (error) {
            console.log("no se pudo leer el archivo");
        }
    }
    async save(objeto) {
        try {
            await this.collection.add(objeto);
            return objeto.title;
        } catch (error) {
            //si sale error de duplicado evitar que se guarde
            if (error.code == 11000) {
                return "El objeto ya existe";
            }
            else {
                console.log("no se puede guardar el archivo ->" + error);
            }
        }
    }
    async editById(id, obj) {
        try {
            const dataUpdate = await this.collection.doc(id).update(obj);
            return dataUpdate;
        } catch (error) {
            console.log("no se pudo editar");
        }
    }
    async delete(id) {
        try {
            const data = await this.collection.doc(id).delete();
            return data.title;
        } catch (error) {
            console.log("no se puede eliminar");
        }
    }
    async add(data) {
        try {
            await this.collection.add(data);
            return data.title;
        } catch (error) {
            console.log("no se puede guardar el archivo");
        }
    }
    async update(id, data) {
        try {
            await this.collection.doc(id).update(data);
            return data.title;
        } catch (error) {
            console.log("no se puede actualizar");
        }
    }
    async getAnalytics() {
        try {
            const data = await analytics.logEvent("test_event", {
                "test_key": "test_value"
            });
            return data;
        } catch (error) {
            console.log("no se puede leer el archivo");
        }
    }
}
//crearemos una instancia de la clase
const contenedorFirebase = new ContenedorFirebase();
module.exports = contenedorFirebase;