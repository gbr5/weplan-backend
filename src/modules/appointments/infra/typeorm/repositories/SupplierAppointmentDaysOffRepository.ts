import { getRepository, Repository } from 'typeorm';

import ISupplierAppointmentDaysOffRepository from '@modules/appointments/repositories/ISupplierAppointmentDaysOffRepository';
import ICreateSupplierAppointmentDayOffDTO from '@modules/appointments/dtos/ICreateSupplierAppointmentDayOffDTO';

import SupplierAppointmentDayOff from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayOff';

class SupplierAppointmentDaysOffRepository
  implements ISupplierAppointmentDaysOffRepository {
  private ormRepository: Repository<SupplierAppointmentDayOff>;

  constructor() {
    this.ormRepository = getRepository(SupplierAppointmentDayOff);
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<SupplierAppointmentDayOff[]> {
    const findSupplierAppointmentDayOff = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findSupplierAppointmentDayOff;
  }

  public async findByWeekDayId(
    id: string,
  ): Promise<SupplierAppointmentDayOff | undefined> {
    const findSupplierAppointmentDayOff = await this.ormRepository.findOne({
      where: { id },
    });

    return findSupplierAppointmentDayOff;
  }

  public async create({
    supplier_id,
    day_off,
  }: ICreateSupplierAppointmentDayOffDTO): Promise<SupplierAppointmentDayOff> {
    const supplierAppointmentDayOff = this.ormRepository.create({
      supplier_id,
      day_off,
    });

    await this.ormRepository.save(supplierAppointmentDayOff);

    return supplierAppointmentDayOff;
  }

  public async delete({ id }: SupplierAppointmentDayOff): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default SupplierAppointmentDaysOffRepository;
