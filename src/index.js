const express = require('express');
const morgan = require('morgan');
const ehdl = require('express-handlebars');
const path = require('path');

//inicializacion
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', ehdl({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//variables globales
app.use((req, res, next)=>{
    next();
});

//rutas
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//starting server
app.listen(app.get('port'), () => {
    console.log('escuchando en el puerto: ', app.get('port'));
});