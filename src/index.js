// src/index.js
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import  empleadosRoutes from './routes/empleados.routes.js';
import clientesRoutes from './routes/clientes.routes.js';
import accesorioRoutes from './routes/accesorio.routes.js';
import indexRoutes from './routes/index.routes.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';




const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));


io.on('Connection', (socket)=>{
  console.log('a user has connected')

  socket.on('disconnecte', ()=>{
    console.log('un usuario desconectado')
  })
})




app.use(session({
    secret: 'secretsoftware',
    resave: false,
    saveUninitialized: false,
}));

app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));


app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get('/', (req, res) => {
    if (req.session.usuarioId) {
        res.redirect('/list'); 
    } else {
        res.redirect('/login');
    }
});

app.use('/', empleadosRoutes);
app.use('/', accesorioRoutes);
app.use('/', clientesRoutes);
app.use('/',indexRoutes);


app.use(express.static(join(__dirname, 'public')));

app.listen(app.get('port'), () =>
    console.log('Server listening on port', app.get('port')));
