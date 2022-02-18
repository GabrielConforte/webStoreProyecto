const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes/store.routes');
const path = require('path');
// Seteos
app.set('port', process.env.PORT || 3030);


//midlewares
app.use(morgan('dev'));//esto lo vi en un video y me gusto para usarlo en el desarrollo del proyecto
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use("/api",routes);

//estaticos
app.use(express.static(path.join(__dirname, 'public')));

//inicializar
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
    });

app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: 'Not found'
    });
});