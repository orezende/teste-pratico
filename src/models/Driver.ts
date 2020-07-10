import { uuid } from 'uuidv4';

export default class Driver {
  id: string;

  nome: string;

  constructor({ nome }: Omit<Driver, 'id'>) {
    this.id = uuid();
    this.nome = nome;
  }
}
