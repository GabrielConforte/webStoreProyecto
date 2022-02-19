import React , {useState, useEffect} from "react";
import { render } from "react-dom";

function Carrito() {
let id = 1;
   const [carrito, setCarrito] = useState([]);
    let aux = [];
    useEffect(() => {
        getLista();
    }, []);


    const getLista = () => {
        fetch(`/api/carrito/${id}/productos`)
            .then(res => res.json())
            .then(data => {
                aux = data[0].items;
                console.log(aux[0].title);
                setCarrito(aux);
            })
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Carrito</h5>
                <div className="card-text">
                    {
                        carrito.map(items => {
                            return (
                                <div key={items.id} className="mb-3 card text-center">
                                    <h4>{items.title}</h4>
                                    <p>{"$"+items.price}</p>
                                    <p>{<img width="100px" src={items.thumbnail}></img>}</p>
                                    <p>{items.codigo}</p>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    );

}

export default Carrito;