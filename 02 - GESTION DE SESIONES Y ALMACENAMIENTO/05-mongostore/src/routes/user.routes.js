import { Router } from 'express';
const router = Router();
import { login, logout, visit, infoSession } from '../controllers/user.controllers.js';
import { validateLogIn } from '../middlewares/middlewares.js'

router.post('/login', login);   //---> en cookies guarda el connect.sid (_id del doc de la sesion)

router.get('/info', validateLogIn, infoSession);

router.get('/secret-endpoint', validateLogIn, visit);

router.post('/logout', logout);

export default router;

