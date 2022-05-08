
import  contenedorFirebase  from "../contenedores/contenedorFirebase";

export default class CarritosDaoFirebase {
    constructor() {
        this.collection = contenedorFirebase.firestore().collection("carritos");
    }}

module.exports = CarritosDaoFirebase;