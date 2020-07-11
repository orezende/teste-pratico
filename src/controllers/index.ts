import { Router } from 'express';
import CarController from './CarController';
import DriverController from './DriverController';

const routes = Router();

routes.use('/car', CarController);
routes.use('/driver', DriverController);
// routes.use('/rent');

export default routes;
