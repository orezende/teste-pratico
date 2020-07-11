import { isUuid } from 'uuidv4';
import DriverRepository from '../../repositories/Driver';

describe('Driver Repositor Context', () => {
  it('Should be able to create a driver', () => {
    expect.hasAssertions();
    const driverRepository = new DriverRepository();

    const driverCreated = driverRepository.create('João Vitor');

    expect(driverCreated).toHaveProperty('id');
    expect(isUuid(driverCreated.id)).toBe(true);
  });

  it('Should be able to list a drivers', () => {
    expect.hasAssertions();
    const driverRepository = new DriverRepository();

    driverRepository.create('João Vitor');
    driverRepository.create('Jamito');

    const drivers = driverRepository.find();

    expect(drivers.length).toBeGreaterThan(0);
    expect(drivers.length).toBe(2);
  });

  it('Should be able to list a drivers filtered by name', () => {
    expect.hasAssertions();
    const driverRepository = new DriverRepository();

    driverRepository.create('João Vitor');
    driverRepository.create('Jamito');
    driverRepository.create('Jamito 2');
    driverRepository.create('João Vitor 2');

    const drivers = driverRepository.find('Jamito');

    expect(drivers.length).toBeGreaterThan(0);
    expect(drivers.length).toBe(1);
    expect(drivers[0].nome).toBe('Jamito');
  });

  it('Should be able to find driver by id', () => {
    expect.hasAssertions();
    const driverRepository = new DriverRepository();

    driverRepository.create('Jamito');
    driverRepository.create('Jamito 2');
    const { id } = driverRepository.create('João Vitor 2');

    const driverFounded = driverRepository.findById(id);

    expect(driverFounded).toHaveProperty('id');
    expect(driverFounded.nome).toBe('João Vitor 2');
  });

  it('Should be able to update driver', () => {
    expect.hasAssertions();
    const driverRepository = new DriverRepository();

    const { id } = driverRepository.create('João Vitor');
    driverRepository.create('Jamito');

    const driverUpdated = driverRepository.update({ id, nome: 'Sucrilos' });

    expect(driverUpdated.id).toBe(id);
    expect(driverUpdated.nome).toBe('Sucrilos');
  });

  it('Should be able to remove a driver', () => {
    expect.hasAssertions();
    const driverRepository = new DriverRepository();

    driverRepository.create('João Vitor');
    driverRepository.create('João Vitor1');
    const { id } = driverRepository.create('João Vitor2');
    driverRepository.create('João Vitor3');

    driverRepository.remove(id);

    const driversFounded = driverRepository.find();

    const driverWasExcluded = driversFounded.findIndex(
      driver => driver.id === id,
    );

    expect(driversFounded.length).toBe(3);
    expect(driverWasExcluded).toBe(-1);
  });
});
