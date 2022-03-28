
import React from "react";
import {render} from "react-dom";
import { useState, useEffect } from "react";
import FormEdit from "./FormEdit";



function Listado() {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        getLista();
    }, []);

    const getLista = () => {
        fetch("/api/productos")
            .then(res => res.json())
            .then(data => {
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
        render(<FormEdit producto={producto} />, document.getElementById("app"));
    }

    const agregarAlCarrito = (id) => {
        fetch(`/api/carrito/624232313441d7fe66fc18ce/productos/${id}`, {
            method: "POST"
        })

        }
        return (
                    <div className="col-5">
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
                                                <p>{producto.stock}</p>
                                                <div className="container p-1">
                                                    <div className="m-1">
                                                        <button type="submit" onClick={()=>{agregarAlCarrito(producto.id)}}className="btn btn-success">Añadir al Carro</button>
                                                        </div>
                                                    <div className="m-1">
                                                        <button type="submit" onClick={()=>{eliminarProducto(producto.id)}}className="btn btn-danger">Borrar</button>
                                                        <button type="submit" onClick={()=>{editarProducto(producto)}}className="btn btn-warning">Editar</button>
                                                        </div>
                                               
                                                
                                                
                                                </div>
                                                
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