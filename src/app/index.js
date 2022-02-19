import React from "react";
import {render}from "react-dom";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import Carrito from "./components/Carrito";


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
                    <Formulario/>
                    <Listado/>
                    <Carrito/>
                </div>
            </div>
            
        </div>
        )
    }
}

render(<App/>, document.getElementById("app"));

//recuerdas las rutas que estan configuradas en routes.js? 
//si no, puedes verlas en la consola de tu navegador, en la barra de direcciones
//quiero que hagas funciones que activen esas rutas y que me rendericen los componentes correspondientes
//para eso, necesitas importar el componente correspondiente en el archivo que corresponda
//por ahora solo tengo formulario
//para que funcione, necesito que el componente formulario tenga una propiedad llamada onSubmit
//la cual recibe una funcion que recibe un objeto con los datos del formulario
//uy gracias lo habia olvidado
//ahora, en el componente formulario, necesito que me renderice una lista de productos
