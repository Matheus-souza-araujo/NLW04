import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const rounter = Router();

const userController = new UserController()
const surveysController = new SurveysController()

rounter.post('/users', userController.create)

rounter.post('/surveys', surveysController.create)
rounter.get('/surveys', surveysController.show)


export { rounter }