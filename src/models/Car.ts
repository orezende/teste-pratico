import { uuid } from 'uuidv4';

export default class Car {
  id: string;

  placa: string;

  cor: string;

  marca: string;

  constructor({ cor, placa, marca }: Omit<Car, 'id'>) {
    this.id = uuid();
    this.cor = cor;
    this.marca = marca;
    this.placa = placa;
  }
}
