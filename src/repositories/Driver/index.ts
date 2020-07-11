import Driver from '../../models/Driver';

interface DriverDTO {
  id: string;
  nome: string;
}

export default class DriverRepository {
  private drivers: Array<Driver>;

  constructor() {
    this.drivers = [];
  }

  public create(nome: string): Driver {
    const driverCreated = new Driver({ nome });

    this.drivers.push(driverCreated);

    return driverCreated;
  }

  public find(nome = ''): Array<Driver> {
    if (nome) {
      return this.drivers.filter(driver => driver.nome === nome);
    }
    return this.drivers;
  }

  public findById(id: string): Driver {
    const driverFoundIndex = this.drivers.findIndex(driver => driver.id === id);

    return this.drivers[driverFoundIndex];
  }

  public update({ id, nome }: DriverDTO): Driver {
    const carIndex = this.drivers.findIndex(driver => driver.id === id);

    const { id: driverId } = this.drivers[carIndex];

    this.drivers[carIndex] = {
      id: driverId,
      nome,
    };

    return this.drivers[carIndex];
  }

  public remove(id: string): void {
    const driverRemoved = this.drivers.filter(driver => driver.id !== id);

    this.drivers = driverRemoved;
  }
}
