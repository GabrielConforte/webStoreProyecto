//importa el contenedor de firebase y crea un dao para el manejo de firebase de los productos
import { ContenedorFirebase } from "../contenedores/contenedorFirebase";

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        this.collection = contenedorFirebase.firestore().collection("productos")
    }
}
export default ProductosDaoFirebase;