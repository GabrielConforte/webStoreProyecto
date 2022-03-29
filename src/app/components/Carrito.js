import React , {useState, useEffect} from "react";

function Carrito() {
   const [CarritoId, setCarritoId] = useState("");
   const [carrito, setCarrito] = useState([]);



    useEffect(() => {
        getLista();
        getCarrito();
    }, []);

    const getCarrito = () => {
        fetch("/api/carrito")
            .then(res => res.json())
            .then(data => {
                
                if(data!=null||data!=undefined){
                setCarritoId(data[0].code);}
                else{
                    fetch("/api/carrito", {
                        method: "POST"
                    })
                    getCarrito();
                }
            })
    }


    const getLista = () => {
        fetch(`/api/carrito/${CarritoId}`)
            .then(res => res.json())
            .then(data => {
                setCarrito(data[0].items);
            }
            );
    }
    const eliminarProducto = (id) => {
        fetch(`/api/carrito/${CarritoId}/productos/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                setCarrito(carrito.filter(producto => producto.code !== id));
            })
    }

    const vaciarCarrito = () => {
        fetch(`/api/carrito/${CarritoId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCarrito([]);
            })
    }
    return (
        <div className="col-2">
            <div className="card-body">
                <h5 className="card-title">Carrito{}</h5>
                <div className="card-text">
                    
                    { carrito.length > 0 ? <>
                    {console.log(carrito)}{
                    carrito.map(items => {
                            return (
                                <div key={items.code} className="mb-3 card text-center">
                                    <h4>{items.title}</h4>
                                    <p>{"$"+items.price}</p>
                                    <p>{<img width="50px" src={items.thumbnail}></img>}</p>
                                    <button type="submit" onClick={()=>eliminarProducto(items.code)} className="btn btn-danger">eliminar</button>
                                </div>
                            )
                        }
                        )}
                        
                        <button type="submit" onClick={()=>vaciarCarrito()}className="btn btn-warning">Vaciar Carrito</button>

                        </>
                        
                    : <div>No hay productos</div>
                    }


                </div>
            </div>
        </div>
    );

}

export default Carrito;