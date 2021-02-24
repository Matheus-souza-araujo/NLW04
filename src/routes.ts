import { Router } from 'express';
import { UserController } from './controllers/UserController';

const rounter = Router();

const userController = new UserController

rounter.post('/users', userController.create)

export { rounter }