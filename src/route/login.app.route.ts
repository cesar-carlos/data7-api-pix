import { Router } from 'express';
import LoginAppController from '../controllers/expedicao/login.app.controller';
import { validateBody } from '../middleware/validation.middleware';
import { loginSchema } from '../validation/login.validation';

const router = Router();

// Rotas para login app
router.get('/login-app', LoginAppController.get); // Buscar usuários por nome
router.post('/login-app', validateBody(loginSchema), LoginAppController.post); // Fazer login
router.put('/login-app', LoginAppController.put);
router.delete('/login-app', LoginAppController.delete);

export default router;
