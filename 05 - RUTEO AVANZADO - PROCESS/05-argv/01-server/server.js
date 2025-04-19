import express from 'express';

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.argv[2] || 8080
const ENV = process.argv[3]

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT}, ${ENV}`);
});