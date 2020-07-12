import request from 'supertest';
import app from '../../app';

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

    const { id: carId } = carCreated.body;
    const { id: driverId } = driverCreated.body;

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

    const { id: carId } = carCreated.body;
    const { id: driverId } = driverCreated.body;
    const { id: secondDriveIdToRentASameCar } = secondDriverToRentASameCar.body;

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
    const carCreated = await request(app).post('/car').send({
      cor: 'azul',
      placa: 'abc-1234',
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

    const { id: carId } = carCreated.body;
    const { id: carIdToRentASameDriver } = carToRent.body;
    const { id: driverId } = driverCreated.body;

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
});
