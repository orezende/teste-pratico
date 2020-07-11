import { Router } from 'express';

const routes = Router();

routes.use('/car');
routes.use('/driver');
routes.use('/rent');

export default routes;
