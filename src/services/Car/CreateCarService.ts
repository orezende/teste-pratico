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
    const carAlreadyCreated = this.carRepository.find({ placa });

    if (carAlreadyCreated.length !== 0) {
      throw Error('Placa de carro já cadastrada');
    }

    return this.carRepository.create({
      cor,
      marca,
      placa,
    });
  }
}
