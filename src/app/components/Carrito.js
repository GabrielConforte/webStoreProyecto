import React , {useState, useEffect} from "react";

function Carrito() {
    let carrito_id = 1;
   const [carrito, setCarrito] = useState([]);
    let aux = '';
    
    useEffect(() => {
        getLista();
    }, [carrito]);

    const getLista = () => {
        fetch(`/api/carrito/${carrito_id}/productos`)
            .then(res => res.json())
            .then(data => {
                if(data.length > 0){
                aux = data[0].items;
                setCarrito(aux);}
                else{
                    fetch(`/api/carrito`,{
                        method: "POST",
                    })
                    .then(data => {
                        setCarrito(data);
                    })
                }
            })
    }
    const eliminarProducto = (id) => {
        console.log("entro")
        fetch(`/api/carrito/${carrito_id}/productos/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCarrito(carrito.filter(producto => producto.id !== id));
            })
    }

    const vaciarCarrito = () => {
        fetch(`/api/carrito/${carrito_id}`, {
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
                    {
                    carrito.map(items => {
                            return (
                                <div key={items.codigo} className="mb-3 card text-center">
                                    <h4>{items.title}</h4>
                                    <p>{"$"+items.price}</p>
                                    <p>{<img width="50px" src={items.thumbnail}></img>}</p>
                                    <button type="submit" onClick={()=>eliminarProducto(items.id)} className="btn btn-danger">eliminar</button>
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