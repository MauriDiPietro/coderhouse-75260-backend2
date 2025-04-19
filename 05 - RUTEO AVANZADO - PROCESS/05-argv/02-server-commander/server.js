import express from 'express';
import { program } from 'commander'

const app = express();

program
    .option('-p <port>', 'port server', 8080)
    .option('-e <environment>', 'environment server', 'dev')

program.parse();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const PORT = program.opts().p
const mode = program.opts().e

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`mode: ${mode}`);
});

