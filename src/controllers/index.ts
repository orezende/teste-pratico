import { Router } from 'express';
import CarController from './CarController';
import DriverController from './DriverController';
import RentController from './RentController';

const routes = Router();

routes.use('/car', CarController);
routes.use('/driver', DriverController);
routes.use('/rent', RentController);

export default routes;
