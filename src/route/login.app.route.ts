import { Router } from 'express';
import LoginAppController from '../controllers/expedicao/login.app.controller';
import { validateBody, validateQuery } from '../middleware/validation.middleware';
import { loginSchema } from '../validation/login.validation';
import { consultaLoginAppQuerySchema } from '../validation/consulta.login.app.validation';
import { updateLoginAppSchema } from '../validation/login.app.validation';

const router = Router();

// Rotas para login app
router.get('/login-app', validateQuery(consultaLoginAppQuerySchema), LoginAppController.get); // Consultar usuários
router.post('/login-app', validateBody(loginSchema), LoginAppController.post); // Fazer login
router.put('/login-app', validateBody(updateLoginAppSchema), LoginAppController.put); // Atualizar usuário
router.delete('/login-app', LoginAppController.delete);

export default router;
