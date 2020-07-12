import { Router, Request, Response } from 'express';

import RentRepository from '../repositories/Rent';
import CreateRentService from '../services/Rent/CreateRentService';

const carController = Router();

const rentRepository = new RentRepository();
const createRentService = new CreateRentService(rentRepository);

carController.post('/', (request: Request, response: Response) => {
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

export default carController;
