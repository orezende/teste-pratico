import { Router, Request, Response } from 'express';

import DriverRepository from '../repositories/Driver';

const driverController = Router();

const driverRepository = new DriverRepository();

driverController.get('/', (request: Request, response: Response) => {
  const { nome, id } = request.query;

  if (id) {
    const driver = driverRepository.findById(id.toString());

    return response.json({ driver }).send();
  }

  const drivers = driverRepository.find(nome?.toString());

  return response.json({ drivers }).send();
});

driverController.post('/', (request: Request, response: Response) => {
  const { nome } = request.body;

  const driverCreated = driverRepository.create(nome);

  return response.json({ driver: driverCreated });
});

driverController.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params;

  driverRepository.remove(id);

  return response.status(204).send();
});

driverController.put('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  const { nome } = request.body;

  const driverCreated = driverRepository.update({ nome, id });

  return response.json({ driver: driverCreated });
});

export default driverController;
