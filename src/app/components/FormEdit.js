//crea un componente de react llamado FormEdit, que reciba datos por props y los pase por consola
import React from "react";
import {render} from "react-dom";
import { useState, useEffect } from "react";

function FormEdit(props){
    const [producto, setProducto] = useState(props.producto);
    console.log(producto);

    const editProducto = (e) => {
        e.preventDefault();
        console.log(e.target.description.value);
        fetch(`/api/productos/${producto.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: e.target.title.value,
                price: e.target.price.value,
                thumbnail: e.target.thumbnail.value,
                description: e.target.description.value,
                codigo: e.target.codigo.value,
                stock: e.target.stock.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            alert(data);
            //refresca 
            window.location.reload();
        })
    }

return(<div className="card">
<div className="card-body">
    <h5 className="card-title">Editar producto</h5>
    <div className="card-text">
        <form onSubmit={editProducto}>
            <div className="form-group">
                <label>Nombre Producto</label>
                <input type="text" className="form-control" id="title" name="title" defaultValue={producto.title}></input>
            </div>
            <div className="form-group">
                <label>Precio</label>
                <input type="number" className="form-control" id="price" name="price" defaultValue={producto.price}></input>
            </div>
            <div className="form-group">
                <label>Imagen</label>
                <input type="text" className="form-control" id="thumbnail" name="thumbnail" defaultValue={producto.thumbnail}></input>
            </div>
            <div className="form-group">
                <textarea width="150px" maxLength="128" id="description" name="description" className='rounded s' defaultValue={producto.description}></textarea>
            </div>
            <div className="form-group">
                <label>Codigo</label>
                <input type="number" className="form-control" id="codigo" name="codigo" defaultValue={producto.codigo}></input>
            </div>
            <div className="form-group">
                <label>Stock</label>
                <input type="number" className="form-control" id="stock" name="stock" defaultValue={producto.stock}></input>
            </div>
            <button type="submit" className="btn btn-dark text-info">Enviar</button>
            
        </form>
    </div>
</div>
</div>
)}

export default FormEdit;

/**
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Editar producto</h5>
                    <div className="card-text">
                        <form>
                            <div className="form-group">

                            </div>
                        </form>
                    </div>
                </div>
            </div> */