const express = require('express');
const morgan = require('morgan');
const ehdl = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const { database } = require('./keys');

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
app.use(session({
    secret: 'killjoy',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
  app.use(flash());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(flash());

//variables globales
app.use((req, res, next)=>{
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
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