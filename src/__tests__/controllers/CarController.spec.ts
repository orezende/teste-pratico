import request from 'supertest';
import app from '../../app';

describe('Car Controller context', () => {
  it('Should be able to create a car', async () => {
    expect.hasAssertions();

    const response = await request(app).post('/car').send({
      cor: 'preto',
      placa: 'abc-1234',
      marca: 'honda',
    });

    expect(response.body.car).toHaveProperty('id');
  });
  it('Should be able to list all cars', async () => {
    expect.hasAssertions();

    await request(app).post('/car').send({
      cor: 'preto',
      placa: 'cba-4321',
      marca: 'honda',
    });

    await request(app).post('/car').send({
      cor: 'verde',
      placa: 'abc-1234',
      marca: 'fiat',
    });

    const response = await request(app).get('/car');

    expect(response.status).toBe(200);
    expect(response.body.cars.length).toBeGreaterThan(1);
  });
  it('Should be able to list all cars filted by color,  brand and license', async () => {
    expect.hasAssertions();

    await request(app).post('/car').send({
      cor: 'preto',
      placa: 'cba-4321',
      marca: 'honda',
    });

    await request(app).post('/car').send({
      cor: 'preto',
      placa: 'zzz-9999',
      marca: 'fiat',
    });

    const response = await request(app).get('/car').query({
      cor: 'preto',
      marca: 'fiat',
      placa: 'zzz-9999',
    });

    expect(response.body.cars.length).toBe(1);
    expect(response.body.cars[0].placa).toBe('zzz-9999');
  });
  it('Should be able to list car filted by id', async () => {
    expect.hasAssertions();

    const carCreated = await request(app).post('/car').send({
      cor: 'preto',
      placa: 'opa-5566',
      marca: 'honda',
    });

    const { id } = carCreated.body.car;

    const response = await request(app).get('/car').query({
      id,
    });

    expect(response.body.car.placa).toBe('opa-5566');
  });
  it('should be able to remove a car', async () => {
    const response = await request(app).post('/car').send({
      cor: 'preto',
      placa: 'utf-4444',
      marca: 'wolksvagen',
    });

    const { id } = response.body.car;

    await request(app).delete(`/car/${id}`);

    const verifyQuantityOfCars = await request(app).get('/car').query({
      cor: 'preto',
      placa: 'utf-4444',
      marca: 'wolksvagen',
    });

    expect(verifyQuantityOfCars.body.cars.length).toBe(0);
  });
  it('should be aupdate a car', async () => {
    const carCreated = await request(app).post('/car').send({
      cor: 'verde',
      placa: 'utf-5555',
      marca: 'fiat',
    });

    const { id } = carCreated.body.car;

    await request(app).put(`/car/${id}`).send({
      cor: 'preto',
      placa: 'utf-5555',
      marca: 'honda',
    });

    const carUpdated = await request(app).get('/car').query({
      id,
    });

    expect(carUpdated.body.car).toMatchObject({
      id,
      cor: 'preto',
      placa: 'utf-5555',
      marca: 'honda',
    });
  });
});
