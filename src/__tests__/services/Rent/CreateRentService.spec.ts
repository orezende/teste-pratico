import RentRepository from '../../../repositories/Rent';
import DriverRepository from '../../../repositories/Driver';
import CarRepository from '../../../repositories/Car';

import CreateRentService from '../../../services/Rent/CreateRentService';

describe('Create Rent Service context', () => {
  it('should be able create a rent', () => {
    expect.hasAssertions();

    const rentRepository = new RentRepository();
    const carRepository = new CarRepository();
    const driverRepository = new DriverRepository();
    const createRentService = new CreateRentService(rentRepository);

    const { id: carId } = carRepository.create({
      cor: 'preto',
      marca: 'honda',
      placa: 'abc-1234',
    });

    const { id: driverId } = driverRepository.create('joao');

    createRentService.execute({
      carId,
      driverId,
      dataInicio: new Date(),
      motivo: 'rodar em aplicativo',
    });

    const rentsFound = rentRepository.find();

    expect(rentsFound.length).toBe(1);
  });

  it('should not be able to create a rent with the car who already in use', () => {
    expect.hasAssertions();

    const rentRepository = new RentRepository();
    const carRepository = new CarRepository();
    const driverRepository = new DriverRepository();
    const createRentService = new CreateRentService(rentRepository);

    const { id: carId } = carRepository.create({
      cor: 'preto',
      marca: 'honda',
      placa: 'abc-1234',
    });

    const { id: driverId } = driverRepository.create('joao');
    const { id: driverIdWantsToRentCar } = driverRepository.create('jessica');

    createRentService.execute({
      carId,
      driverId,
      dataInicio: new Date(),
      motivo: 'rodar em aplicativo',
    });

    const rentsFound = rentRepository.find();

    expect(() => {
      createRentService.execute({
        carId,
        driverId: driverIdWantsToRentCar,
        dataInicio: new Date(),
        motivo: 'rodar em aplicativo',
      });
    }).toThrow('Carro já alugado');

    expect(rentsFound.length).toBe(1);
  });

  it('should not be able to create a rent a car with multiples car with a unique drive', () => {
    expect.hasAssertions();

    const rentRepository = new RentRepository();
    const carRepository = new CarRepository();
    const driverRepository = new DriverRepository();
    const createRentService = new CreateRentService(rentRepository);

    const { id: carId } = carRepository.create({
      cor: 'preto',
      marca: 'honda',
      placa: 'abc-1234',
    });

    const { id: carToRent } = carRepository.create({
      cor: 'azul',
      marca: 'fiat',
      placa: 'cba-4321',
    });

    const { id: driverId } = driverRepository.create('joao');

    createRentService.execute({
      carId,
      driverId,
      dataInicio: new Date(),
      motivo: 'rodar em aplicativo',
    });

    const rentsFound = rentRepository.find();

    expect(() => {
      createRentService.execute({
        carId: carToRent,
        driverId,
        dataInicio: new Date(),
        motivo: 'rodar em aplicativo',
      });
    }).toThrow('Motorista já tem um carro alugado');

    expect(rentsFound.length).toBe(1);
  });
});
