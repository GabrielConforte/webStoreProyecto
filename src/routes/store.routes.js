const express = require('express');
const routes = express.Router();
const contenedor = require("../models/contenedor");
const carrito = require("../models/carrito");
const isAdmin = false

const error403 = {
    status: 403,
    message: 'No tienes permisos para realizar esta acción'
};

//rutas para el listado de productos
routes.get('/productos/:id', async (req, res) => {
        try {
            let objeto = await contenedor.getById(req.params.id);
            if (objeto != undefined) {
                res.json(objeto);
                }
                else {
                    res.json('no existe el objeto');
                }
    }
    catch (error) {
        console.log(error);
    }
});

routes.post('/productos', async (req, res) => {
    if(isAdmin){
        try {
        let objeto = await contenedor.save(req.body);
        res.json("objeto guardado");
    }
    catch (error) {
        console.log(error);
    }
    }
    else{
        res.json(error403);
    }
    
});

routes.delete('/productos/:id', async (req, res) => {
    if(isAdmin){
    try {
        let objeto = await contenedor.deleteById(req.params.id);
        res.json("objeto eliminado");
    }
    catch (error) {
        console.log(error);
    }
    }else{
        res.json(error403);
    }
});

routes.put('/productos/:id', async (req, res) => {
    if(isAdmin){
    try {
        let objeto = await contenedor.update(req.params.id, req.body);
        res.json("objeto actualizado");
    }
    catch (error) {
        console.log(error);
    }
    }else{
        res.json(error403);
    }
});

routes.get('/productos', async (req, res) => {
    try {
        let objeto = await contenedor.getAll();
        res.json(objeto);
        }
        catch (error) {
            console.log(error);
            }
            });

//rutas para el carrito

routes.post('/carrito', async (req, res) => {
    try {
        let objeto = await carrito.createCarrito(req.params.id);
        res.json({carritoId: objeto});
    }
    catch (error) {
        console.log(error);
    }
});

routes.delete('/carrito/:id', async (req, res) => {
    try {
        let objeto = await carrito.deleteAllbyId(req.params.id);
        res.json(objeto);
        }
        catch (error) {
            console.log(error);
            }
            });

routes.get('/carrito/:id/productos', async (req, res) => {
    try {
        let objeto = await carrito.getAllbyId(req.params.id);
        res.json(objeto);
    }
    catch (error) {
        console.log(error);
    }
}
);


routes.post('/carrito/:id/productos/:id_prod', async (req, res) => {
    try {
        let producto = await contenedor.getById(req.params.id_prod);
        let objeto = await carrito.addProducto(req.params.id, producto);
        res.json(objeto);
    }
    catch (error) {
        console.log(error);
    }
}
);

routes.delete('/carrito/:id/productos/:id_prod', async (req, res) => {
    try {
        let objeto = await carrito.deleteProducto(req.params.id, req.params.id_prod);
        res.json(objeto);
        }
        catch (error) {
            console.log(error);
            }
            });
                


    module.exports = routes;