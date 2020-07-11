import { isUuid } from 'uuidv4';
import CarRepository from '../../repositories/Car';

describe('Repository Car Context', () => {
  it('should be able to insert a car', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();

    const carCreated = carRepository.create({
      placa: 'aaa-0000',
      cor: 'amarelo',
      marca: 'honda',
    });

    expect(carCreated).toHaveProperty('id');
    expect(isUuid(carCreated.id)).toBe(true);
  });

  it('should be able to list all cars', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();

    carRepository.create({
      placa: 'aaa-4321',
      cor: 'verde',
      marca: 'fiat',
    });

    carRepository.create({
      placa: 'abc-4321',
      cor: 'azul',
      marca: 'wolksvagem',
    });

    const cars = carRepository.find();

    expect(cars.length).toBe(2);
  });

  it('should be able to remove a car', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();

    carRepository.create({
      placa: 'aaa-0000',
      cor: 'amarelo',
      marca: 'honda',
    });

    const { id } = carRepository.create({
      placa: 'aaa-0000',
      cor: 'amarelo',
      marca: 'honda',
    });

    carRepository.remove(id);

    const cars = carRepository.find();

    expect(cars.length).toBe(1);
    expect(cars[0].id).not.toBe(id);
  });

  it('should be able to update car values', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();

    const { id } = carRepository.create({
      placa: 'abc-1234',
      marca: 'fiat',
      cor: 'preto',
    });

    const carUpdated = carRepository.update({
      id,
      cor: 'amarelo',
      marca: 'honda',
      placa: 'abc-1234',
    });

    expect(carUpdated).toMatchObject({
      id,
      cor: 'amarelo',
      marca: 'honda',
      placa: 'abc-1234',
    });
  });

  it('should be able to find car by id', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();

    const { id } = carRepository.create({
      placa: 'abc-1234',
      marca: 'fiat',
      cor: 'preto',
    });

    const carFound = carRepository.findById(id);

    expect(carFound).toMatchObject({
      id,
      placa: 'abc-1234',
      marca: 'fiat',
      cor: 'preto',
    });
  });

  it('should be able to find car by brand', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();

    carRepository.create({
      placa: 'aaa-0000',
      cor: 'amarelo',
      marca: 'fiat',
    });

    carRepository.create({
      placa: 'aaa-1234',
      cor: 'amarelo',
      marca: 'honda',
    });

    const cars = carRepository.find({ marca: 'honda' });

    expect(cars.length).toBe(1);
    expect(cars[0].placa).toBe('aaa-1234');
  });

  it('should be able to find car by color', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();

    carRepository.create({
      placa: 'aaa-0000',
      cor: 'amarelo',
      marca: 'fiat',
    });

    carRepository.create({
      placa: 'aaa-1234',
      cor: 'amarelo',
      marca: 'honda',
    });

    carRepository.create({
      placa: 'abc-1234',
      cor: 'verde',
      marca: 'wolksvagem',
    });

    const cars = carRepository.find({ cor: 'amarelo' });

    expect(cars.length).toBe(2);
  });

  it('should be able to find car by brand and color', () => {
    expect.hasAssertions();
    const carRepository = new CarRepository();

    carRepository.create({
      placa: 'aaa-0000',
      cor: 'amarelo',
      marca: 'fiat',
    });

    carRepository.create({
      placa: 'aaa-1234',
      cor: 'amarelo',
      marca: 'honda',
    });

    carRepository.create({
      placa: 'abc-1234',
      cor: 'verde',
      marca: 'wolksvagem',
    });

    const cars = carRepository.find({ cor: 'amarelo', marca: 'honda' });

    expect(cars.length).toBe(1);
    expect(cars[0].placa).toBe('aaa-1234');
  });
});
