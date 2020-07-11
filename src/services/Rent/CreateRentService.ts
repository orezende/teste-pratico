import RentRepository from '../../repositories/Rent';
import Rent from '../../models/Rent';

interface Request {
  carId: string;
  driverId: string;
  dataInicio: Date;
  motivo: string;
}

export default class CreateRentService {
  private rentRepository: RentRepository;

  constructor(rentRepository: RentRepository) {
    this.rentRepository = rentRepository;
  }

  public execute({ carId, driverId, dataInicio, motivo }: Request): Rent {
    const rents = this.rentRepository.find();

    const carAlreadyUse = rents.findIndex(
      rent => rent.carId === carId && rent.dataTermino === undefined,
    );

    if (carAlreadyUse >= 0) {
      throw Error('Carro já alugado');
    }

    const driverAlreadyHasCar = rents.findIndex(
      rent => rent.driverId === driverId && rent.dataTermino === undefined,
    );

    if (driverAlreadyHasCar >= 0) {
      throw Error('Motorista já tem um carro alugado');
    }

    return this.rentRepository.create({
      carId,
      dataInicio,
      motivo,
      driverId,
    });
  }
}
