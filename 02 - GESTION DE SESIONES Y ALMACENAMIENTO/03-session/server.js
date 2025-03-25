import express from "express";
import session from "express-session";
import "dotenv/config";
import { isAdmin, validateLogin } from "./middlewares/index.js";

const app = express();

app.use(express.json());

const sessionConfig = {
  secret: process.env.SECRET_KEY,
  cookie: { maxAge: 30000 },
  saveUninitialized: true,
  resave: false,
};

app.use(session(sessionConfig));

const users = [
    {
        username: 'Juan',
        password: '1234',
        admin: false
    },
    {
        username: 'Guillermo',
        password: '12345',
        admin: true
    }
]

/*
403 Forbidden: no tiene permisos

401 Unauthorized
*/

app.post('/login', (req, res)=>{
    const { username, password } = req.body;
    const index = users.findIndex((user) => user.username === username && user.password === password);
    if(index < 0) return res.status(400).json({ message: 'credenciales incorrectas' })
    const user = users[index];
    req.session.info = {
        loggedIn: true,
        count: 1,
        admin: user.admin
    }
    res.json({ message: 'Bienvenido/a' })
})

app.get('/secret-endpoint', validateLogin, (req, res)=>{
    req.session.info.count++;
    res.json({
        message: 'info para usuarios logueados',
        session: req.session
    })
})

app.get('/admin-secret-endpoint', validateLogin, isAdmin, (req, res)=>{
    req.session.info.count++;
    res.json({
        message: 'info para usuarios admin',
        session: req.session
    })
})

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'logout ok' })
})

app.listen(8080, ()=>console.log('ok'))