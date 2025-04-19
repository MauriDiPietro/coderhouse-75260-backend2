import express from 'express';
import router from './routes/index.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.all('/*', (req, res, next)=>{
    console.log(`[${new Date().toDateString()}] ${req.method} - ${req.originalUrl}`);
    next()
})

app.use('/', router);


const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Server ok en puerto: ${PORT}`);
});