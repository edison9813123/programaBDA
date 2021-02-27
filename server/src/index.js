const express =  require ('express');
const path = require('path')
const exphbs = require('express-handlebars')
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(cors({origin:'http://127.0.0.1:5500', optionsSuccessStatus:200}));

//middlewares
/*
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'}))
app.set('view engine', '.hbs')*/

//rutas
app.use(require('./routes/index'));

app.listen(4000);
console.log('servidor en el puerto 4000');

