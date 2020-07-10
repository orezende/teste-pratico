import Car from '../../models/Car';

interface CarDTO {
  id?: string;
  placa: string;
  cor: string;
  marca: string;
}

interface FilterCarDTO {
  cor?: string;
  marca?: string;
}

export default class CarRepository {
  private cars: Array<Car>;

  constructor() {
    this.cars = [];
  }

  public create({ cor, placa, marca }: CarDTO): Car {
    const car = new Car({
      cor,
      marca,
      placa,
    });

    this.cars.push(car);

    return car;
  }

  public find({ marca, cor }: FilterCarDTO = {}): Array<Car> {
    if (marca) {
      return this.cars.filter(car => car.marca === marca);
    }
    if (cor) {
      return this.cars.filter(car => car.cor === cor);
    }

    return this.cars;
  }

  public findById(carId: string): Car {
    const carIndexFounded = this.cars.findIndex(car => car.id === carId);

    return this.cars[carIndexFounded];
  }

  public remove(carId: string): void {
    const updatedCarList = this.cars.filter(car => car.id !== carId);

    this.cars = updatedCarList;
  }

  public update({ id, cor, marca, placa }: CarDTO): Car {
    const carIndex = this.cars.findIndex(car => car.id === id);

    const { id: carId } = this.cars[carIndex];

    this.cars[carIndex] = {
      id: carId,
      cor,
      marca,
      placa,
    };

    return this.cars[carIndex];
  }
}
