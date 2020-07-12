import { Router, Request, Response } from 'express';

import RentRepository from '../repositories/Rent';
import CreateRentService from '../services/Rent/CreateRentService';

const rentController = Router();

const rentRepository = new RentRepository();
const createRentService = new CreateRentService(rentRepository);

rentController.post('/', (request: Request, response: Response) => {
  try {
    const { driverId, carId, dataInicio, motivo } = request.body;

    const rentCreated = createRentService.execute({
      carId,
      dataInicio,
      driverId,
      motivo,
    });

    return response.json({ rent: rentCreated });
  } catch (err) {
    return response.status(400).json({ error: { message: err.message } });
  }
});

rentController.get('/', (request: Request, response: Response) => {
  const rents = rentRepository.find();

  return response.json({ rents });
});

rentController.put('/', (request: Request, response: Response) => {
  const { id } = request.body;

  const rentFinalized = rentRepository.update({ id, dataTermino: new Date() });

  return response.json({ rent: rentFinalized });
});
export default rentController;
