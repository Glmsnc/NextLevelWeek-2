import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';
import ClassesController from './database/controllers/ClassesControllers';
import ConnectionsController from './database/controllers/ConnectionsController';

const routes  = express.Router();
const classesControllers = new ClassesController();
const connectionsControllers = new ConnectionsController();

routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

routes.post('/connections', connectionsControllers.create);
routes.get('/connections', connectionsControllers.index);

export default routes;