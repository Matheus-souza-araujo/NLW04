import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const rounter = Router();

const userController = new UserController()
const surveysController = new SurveysController()

const sendMailController = new SendMailController

rounter.post('/users', userController.create)

rounter.post('/surveys', surveysController.create)
rounter.get('/surveys', surveysController.show)

rounter.post('/sendMail', sendMailController.execute)


export { rounter }