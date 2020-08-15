import { getRepository, Repository } from 'typeorm';

import ISupplierAppointmentDayIntervalsRepository from '@modules/appointments/repositories/ISupplierAppointmentDayIntervalsRepository';
import ICreateSupplierAppointmentDayIntervalDTO from '@modules/appointments/dtos/ICreateSupplierAppointmentDayIntervalDTO';

import SupplierAppointmentDayInterval from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayInterval';

class SupplierAppointmentDayIntervalsRepository
  implements ISupplierAppointmentDayIntervalsRepository {
  private ormRepository: Repository<SupplierAppointmentDayInterval>;

  constructor() {
    this.ormRepository = getRepository(SupplierAppointmentDayInterval);
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<SupplierAppointmentDayInterval[]> {
    const findSupplierAppointmentDayInterval = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findSupplierAppointmentDayInterval;
  }

  public async findBySupplierAppointmentDayIntervalId(
    id: string,
  ): Promise<SupplierAppointmentDayInterval | undefined> {
    const findSupplierAppointmentDayInterval = await this.ormRepository.findOne(
      {
        where: { id },
      },
    );

    return findSupplierAppointmentDayInterval;
  }

  public async create({
    start_hour,
    start_minutes,
    duration_minutes,
    supplier_id,
    week_day_id,
  }: ICreateSupplierAppointmentDayIntervalDTO): Promise<
    SupplierAppointmentDayInterval
  > {
    const supplierAppointmentDayInterval = this.ormRepository.create({
      start_hour,
      start_minutes,
      duration_minutes,
      supplier_id,
      week_day_id,
    });

    await this.ormRepository.save(supplierAppointmentDayInterval);

    return supplierAppointmentDayInterval;
  }

  public async save(
    supplierAppointmentDayInterval: SupplierAppointmentDayInterval,
  ): Promise<SupplierAppointmentDayInterval> {
    return this.ormRepository.save(supplierAppointmentDayInterval);
  }

  public async delete({ id }: SupplierAppointmentDayInterval): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default SupplierAppointmentDayIntervalsRepository;
