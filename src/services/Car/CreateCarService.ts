import CarRepository from '../../repositories/Car';
import Car from '../../models/Car';

interface Request {
  placa: string;
  cor: string;
  marca: string;
}

export default class CreateCarService {
  private carRepository: CarRepository;

  constructor(carRepository: CarRepository) {
    this.carRepository = carRepository;
  }

  public execute({ placa, cor, marca }: Request): Car {
    return this.carRepository.create({
      cor,
      marca,
      placa,
    });
  }
}
