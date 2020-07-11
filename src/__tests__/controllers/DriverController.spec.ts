import request from 'supertest';
import app from '../../app';
import Driver from '../../models/Driver';

describe('driver Controller context', () => {
  it('Should be able to create a driver', async () => {
    expect.hasAssertions();

    const response = await request(app).post('/driver').send({
      nome: 'João',
    });

    expect(response.body.driver).toHaveProperty('id');
  });
  it('Should be able to list all drivers', async () => {
    expect.hasAssertions();

    await request(app).post('/driver').send({
      nome: 'João',
    });

    await request(app).post('/driver').send({
      nome: 'Jessica',
    });

    const response = await request(app).get('/driver');

    expect(response.status).toBe(200);
    expect(response.body.drivers.length).toBeGreaterThan(1);
  });
  it('Should be able to list all drivers filtered by name', async () => {
    expect.hasAssertions();

    const driverCreated = await request(app).post('/driver').send({
      nome: 'Joao',
    });

    const { id: driverId } = driverCreated.body.driver;

    const response = await request(app).get('/driver').query({
      nome: 'Joao',
    });

    const { drivers } = response.body;

    const driverFounded = drivers.findIndex(
      (driver: Driver) => driver.id === driverId,
    );

    expect(driverFounded).toBeGreaterThanOrEqual(0);
  });
  it('Should be able to list driver filted by id', async () => {
    expect.hasAssertions();

    const driverCreated = await request(app).post('/driver').send({
      nome: 'Joao',
    });

    const { id } = driverCreated.body.driver;

    const response = await request(app).get('/driver').query({
      id,
    });

    expect(response.body.driver.nome).toBe('Joao');
  });
  it('should be able to remove a driver', async () => {
    const response = await request(app).post('/driver').send({
      nome: 'Joao',
    });

    const { id } = response.body.driver;

    await request(app).delete(`/driver/${id}`);

    const verifyDriverExisting = await request(app).get('/driver').query({
      id,
    });

    expect(verifyDriverExisting.body).toMatchObject({});
  });
  it('should be aupdate a driver', async () => {
    const driverCreated = await request(app).post('/driver').send({
      nome: 'João',
    });

    const { id } = driverCreated.body.driver;

    await request(app).put(`/driver/${id}`).send({
      nome: 'Cleiton',
    });

    const driverUpdated = await request(app).get('/driver').query({
      id,
    });

    expect(driverUpdated.body.driver).toMatchObject({
      id,
      nome: 'Cleiton',
    });
  });
});
