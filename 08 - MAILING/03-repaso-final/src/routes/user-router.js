import { Router } from 'express';
import { userController } from '../controllers/user-controller.js';
import { passportCall } from '../middlewares/passport-call.js'

const router = Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/profile', passportCall('jwt', { session: false }), userController.profile);

export default router;