import React from "react";
import {render}from "react-dom";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import Carrito from "./components/Carrito";
//trae el contexto
import ContextoCarrito from "./components/contexts/ContextoCarrito";

class App extends React.Component {
    render() {
        return (
        <div className="container">   
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <h1>Productos</h1>
                </div>
          </nav>
          <div className="mt-2 container">
                <div className="row">
                    <ContextoCarrito>
                        <Formulario/>
                        <Listado/>
                        <Carrito/>
                    </ContextoCarrito>
                </div>
            </div>
            
        </div>
        )
    }
}

render(<App/>, document.getElementById("app"));