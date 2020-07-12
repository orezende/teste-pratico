import request from 'supertest';
import app from '../../app';

import Rent from '../../models/Rent';

describe('Rent controller context', () => {
  it('should be create a rent', async () => {
    expect.hasAssertions();
    const carCreated = await request(app).post('/car').send({
      cor: 'preto',
      placa: 'hhh-2222',
      marca: 'honda',
    });
    const driverCreated = await request(app).post('/driver').send({
      nome: 'João',
    });

    const { id: carId } = carCreated.body.car;
    const { id: driverId } = driverCreated.body.driver;

    const response = await request(app).post('/rent').send({
      driverId,
      carId,
      dataInicio: new Date(),
      motivo: 'Rodar em aplicativo',
    });

    const { rent } = response.body;

    expect(rent).toHaveProperty('id');
  });

  it('should not be able to create a rent wih rented car', async () => {
    expect.hasAssertions();
    const carCreated = await request(app).post('/car').send({
      cor: 'azul',
      placa: 'abc-1234',
      marca: 'fiat',
    });
    const driverCreated = await request(app).post('/driver').send({
      nome: 'João',
    });

    const secondDriverToRentASameCar = await request(app).post('/driver').send({
      nome: 'Jennifer',
    });

    const { id: carId } = carCreated.body.car;
    const { id: driverId } = driverCreated.body.driver;
    const {
      id: secondDriveIdToRentASameCar,
    } = secondDriverToRentASameCar.body.driver;

    await request(app).post('/rent').send({
      driverId,
      carId,
      dataInicio: new Date(),
      motivo: 'Rodar em aplicativo',
    });

    const response = await request(app).post('/rent').send({
      driverId: secondDriveIdToRentASameCar,
      carId,
      dataInicio: new Date(),
      motivo: 'Rodar em aplicativo',
    });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error.message).toBe('Carro já alugado');
  });

  it('should not be able to create a rent to a driver who already a car', async () => {
    expect.hasAssertions();
    const carCreated = await request(app).post('/car').send({
      cor: 'verde',
      placa: 'opa-4321',
      marca: 'fiat',
    });

    const carToRent = await request(app).post('/car').send({
      cor: 'verde',
      placa: 'pop-2881',
      marca: 'honda',
    });

    const driverCreated = await request(app).post('/driver').send({
      nome: 'João',
    });

    const { id: carId } = carCreated.body.car;
    const { id: carIdToRentASameDriver } = carToRent.body.car;
    const { id: driverId } = driverCreated.body.driver;

    await request(app).post('/rent').send({
      driverId,
      carId,
      dataInicio: new Date(),
      motivo: 'Rodar em aplicativo',
    });

    const response = await request(app).post('/rent').send({
      driverId,
      carId: carIdToRentASameDriver,
      dataInicio: new Date(),
      motivo: 'Rodar em aplicativo',
    });

    const { error } = response.body;

    expect(response.status).toBe(400);
    expect(error.message).toBe('Motorista já tem um carro alugado');
  });

  it('should be able to list a rents', async () => {
    expect.hasAssertions();
    const carCreated = await request(app).post('/car').send({
      cor: 'verde',
      placa: 'ttt-0102',
      marca: 'fiat',
    });

    const driverCreated = await request(app).post('/driver').send({
      nome: 'João',
    });

    const { id: carId } = carCreated.body.car;
    const { id: driverId } = driverCreated.body.driver;

    const rentCreated = await request(app).post('/rent').send({
      driverId,
      carId,
      dataInicio: new Date(),
      motivo: 'Rodar em aplicativo',
    });

    const response = await request(app).get('/rent').send({
      driverId,
      carId,
      dataInicio: new Date(),
      motivo: 'Rodar em aplicativo',
    });

    const { rents } = response.body;

    const { id: rentId } = rentCreated.body.rent;

    const foundRentIndex = rents.findIndex((rent: Rent) => rent.id === rentId);

    expect(rents.length).toBeGreaterThanOrEqual(1);
    expect(foundRentIndex).toBeGreaterThanOrEqual(0);
  });

  it('should be able to finalize a rent', async () => {
    expect.hasAssertions();

    expect.hasAssertions();
    const carCreated = await request(app).post('/car').send({
      cor: 'preto',
      placa: 'gta-1234',
      marca: 'honda',
    });
    const driverCreated = await request(app).post('/driver').send({
      nome: 'João',
    });

    const { id: carId } = carCreated.body.car;
    const { id: driverId } = driverCreated.body.driver;

    const response = await request(app).post('/rent').send({
      driverId,
      carId,
      dataInicio: new Date(),
      motivo: 'Rodar em aplicativo',
    });

    const { id: rentId } = response.body.rent;

    const rentFinalized = await request(app).put('/rent').send({
      id: rentId,
    });

    const { rent } = rentFinalized.body;

    expect(rent.dataTermino).not.toBe(undefined);
  });
});
