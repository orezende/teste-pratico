import { isUuid } from 'uuidv4';

import RentRepository from '../../repositories/Rent';
import CarRepository from '../../repositories/Car';
import DriverRepository from '../../repositories/Driver';

describe('Rent a car context', () => {
  it('Should be able to rent a car', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();
    const driverRepository = new DriverRepository();
    const rentRepository = new RentRepository();

    const { id: carId } = carRepository.create({
      cor: 'azul',
      marca: 'honda',
      placa: 'abc-1213',
    });

    const { id: driverId } = driverRepository.create('joao');

    const rentMade = rentRepository.create({
      dataInicio: new Date(),
      driverId,
      carId,
      motivo: 'Rodar em aplicativo',
    });

    expect(rentMade).toHaveProperty('id');
    expect(isUuid(rentMade.id)).toBe(true);
    expect(rentMade.driverId).toBe(driverId);
    expect(rentMade.carId).toBe(carId);
    expect(rentMade.dataTermino).toBe(undefined);
  });

  it('should be able to finalize a rent', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();
    const driverRepository = new DriverRepository();
    const rentRepository = new RentRepository();

    const { id: carId } = carRepository.create({
      cor: 'azul',
      marca: 'honda',
      placa: 'abc-1213',
    });

    const { id: driverId } = driverRepository.create('joao');

    const { id: rentId } = rentRepository.create({
      dataInicio: new Date(),
      driverId,
      carId,
      motivo: 'Rodar em aplicativo',
    });

    const rentFinalized = rentRepository.update({
      id: rentId,
      dataTermino: new Date(),
    });

    expect(rentFinalized.id).toBe(rentId);
    expect(rentFinalized.dataTermino).not.toBe(undefined);
  });

  it('Should be able to list all rents', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();
    const driverRepository = new DriverRepository();
    const rentRepository = new RentRepository();

    const { id: carId } = carRepository.create({
      cor: 'azul',
      marca: 'honda',
      placa: 'abc-1213',
    });

    const { id: driverId } = driverRepository.create('joao');

    rentRepository.create({
      dataInicio: new Date(),
      driverId,
      carId,
      motivo: 'Rodar em aplicativo',
    });

    const allRents = rentRepository.find();

    expect(allRents.length).toBe(1);
  });
});
