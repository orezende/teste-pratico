import CarRepository from '../../../repositories/Car';
import CreateCarService from '../../../services/Car/CreateCarService';

describe('Create Car Service context', () => {
  it('should be able create a car', () => {
    expect.hasAssertions();

    const carRepository = new CarRepository();

    const createCarService = new CreateCarService(carRepository);

    createCarService.execute({
      placa: 'abc-1234',
      cor: 'preto',
      marca: 'honda',
    });

    const carsFound = carRepository.find();

    expect(carsFound.length).toBe(1);
  });
});
