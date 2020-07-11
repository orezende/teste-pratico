import Rent from '../../models/Rent';

interface CreateRentDTO {
  dataInicio: Date;
  driverId: string;
  carId: string;
  motivo: string;
}

interface FinalizeRentDTO {
  id: string;
  dataTermino: Date;
}

export default class RentRepository {
  private rents: Array<Rent>;

  constructor() {
    this.rents = [];
  }

  public create({ carId, driverId, dataInicio, motivo }: CreateRentDTO): Rent {
    const rentCreated = new Rent({ carId, driverId, dataInicio, motivo });

    this.rents.push(rentCreated);

    return rentCreated;
  }

  public update({ id, dataTermino }: FinalizeRentDTO): Rent {
    const FoundRentIndex = this.rents.findIndex(rent => rent.id === id);

    this.rents[FoundRentIndex].dataTermino = dataTermino;

    return this.rents[FoundRentIndex];
  }
}
