import { Router } from 'express';
import multer from 'multer';

import AppointmentController from './app/controllers/AppointmentController';
import AvaiableController from './app/controllers/AvaiableController';
import FileController from './app/controllers/FileController';
import NotificationController from './app/controllers/NotificationController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);
// --- Rotas sem o middleware de autorização ---
// Rota de registro de usuários
routes.post('/users', UserController.store);
// Rota de login
routes.post('/sessions', SessionController.store);

// --- Middleware global de autenticação ---
// routes.use(authMiddleware);
// Rota de Edição de usuário
routes.put('/users', authMiddleware, UserController.update);

// Rota de Providers
routes.get('/providers', authMiddleware, ProviderController.index);
routes.get('/providers/:providerId/avaiable', AvaiableController.index);

// Rota de Appointments
routes.get('/appointments', authMiddleware, AppointmentController.index);
routes.post('/appointments', authMiddleware, AppointmentController.store);
routes.delete(
  '/appointments/:id',
  authMiddleware,
  AppointmentController.delete
);

// Rotas de Schedule
routes.get('/schedule', authMiddleware, ScheduleController.index);

// Rota de notificações
routes.get('/notifications', authMiddleware, NotificationController.index);
routes.put('/notifications/:id', authMiddleware, NotificationController.update);

// Rota de Upload de arquivos
routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

export default routes;
