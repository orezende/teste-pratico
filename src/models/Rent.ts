import { uuid } from 'uuidv4';

export default class Rent {
  id: string;

  dataInicio: Date;

  dataTermino?: Date;

  driverId: string;

  carId: string;

  motivo: string;

  constructor({ dataInicio, driverId, carId, motivo }: Omit<Rent, 'id'>) {
    this.id = uuid();
    this.dataInicio = dataInicio;
    this.driverId = driverId;
    this.carId = carId;
    this.motivo = motivo;
  }
}
