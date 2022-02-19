
import React from "react";
import {render} from "react-dom";
import { useState, useEffect } from "react";
import FormEdit from "./FormEdit";



function Listado() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getLista();
    }, [productos]);

    const getLista = () => {
        fetch("/api/productos")
            .then(res => res.json())
            .then(data => {
                data = JSON.parse(data);
                setProductos(data);
            })
    }

    const eliminarProducto = (id) => {
        fetch(`/api/productos/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProductos(productos.filter(producto => producto.id !== id));
            })
    }

    
    const editarProducto = (producto) => {
       // setProductos(productos.map(p => p.id === producto.id ? producto : p));
        //renderiza el componente FormEdit
        render(<FormEdit producto={producto} />, document.getElementById("app"));
    }
 
        return (
                    <div className="col-7">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listado de productos</h5>
                                <div className="card-text">
                                    
                                    {productos.map(producto => {
                                        return ( 
                                            <div key={producto.id} className="mb-3 card text-center">
                                                <h4>{producto.title}</h4>
                                                <p>{"$"+producto.price}</p>
                                                <p>{<img width="100px" src={producto.thumbnail}></img>}</p>
                                                <p>{producto.description}</p>
                                                <p>{producto.codigo}</p>
                                                <p>{producto.stock}</p>
                                                <div className="m-2"><button type="submit" onClick={()=>{eliminarProducto(producto.id)}}className="btn btn-danger">Borrar</button>
                                                <button type="submit" onClick={()=>{editarProducto(producto)}}className="btn btn-warning">Editar</button></div>
                                                
                                            </div>
                                        )
                                    })}
                                    

                                </div>
                            </div>
                        </div>
                    </div>
        )
    }


export default Listado;