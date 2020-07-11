import { Router, Request, Response } from 'express';

import CarRepository from '../repositories/Car';
import CreateCarService from '../services/Car/CreateCarService';

const carController = Router();

const carRepository = new CarRepository();
const createCarService = new CreateCarService(carRepository);

carController.get('/', (request: Request, response: Response) => {
  const { cor, marca, placa, id } = request.query;

  if (id) {
    const car = carRepository.findById(id.toString());

    return response.json({ car }).send();
  }

  const cars = carRepository.find({
    cor: cor?.toString(),
    marca: marca?.toString(),
    placa: placa?.toString(),
  });

  return response.json({ cars }).send();
});

carController.post('/', (request: Request, response: Response) => {
  const { cor, marca, placa } = request.body;

  const carCreated = createCarService.execute({
    cor,
    marca,
    placa,
  });

  return response.json({ car: carCreated });
});

carController.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params;

  carRepository.remove(id);

  return response.status(204).send();
});

carController.put('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  const { cor, marca, placa } = request.body;

  const carUpdated = carRepository.update({ cor, marca, placa, id });

  return response.json({ car: carUpdated });
});

export default carController;
