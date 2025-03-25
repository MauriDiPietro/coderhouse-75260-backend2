import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import mainRouter from './routes/user.routes.js';

const FileStore = sessionFileStore(session);

const ttlSeconds = 180; 

const fileStoreOptions = {
  store: new FileStore({ 
    path: './sessions',      
    ttl: ttlSeconds,           
    reapInterval: 60,  
  }),                    
                                     
  secret: 'secretString',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,  
  }                            
};

const app = express();

app.use(express.json());
app.use(cookieParser());  

app.use(session(fileStoreOptions));

app.use('/api', mainRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

export default app;
