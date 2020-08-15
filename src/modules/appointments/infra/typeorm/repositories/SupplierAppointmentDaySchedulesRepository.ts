import { getRepository, Repository } from 'typeorm';

import ISupplierAppointmentDaySchedulesRepository from '@modules/appointments/repositories/ISupplierAppointmentDaySchedulesRepository';
import ICreateSupplierAppointmentDayScheduleDTO from '@modules/appointments/dtos/ICreateSupplierAppointmentDayScheduleDTO';

import SupplierAppointmentDaySchedule from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDaySchedule';

class SupplierAppointmentDaySchedulesRepository
  implements ISupplierAppointmentDaySchedulesRepository {
  private ormRepository: Repository<SupplierAppointmentDaySchedule>;

  constructor() {
    this.ormRepository = getRepository(SupplierAppointmentDaySchedule);
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<SupplierAppointmentDaySchedule[]> {
    const findSupplierAppointmentDaySchedule = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findSupplierAppointmentDaySchedule;
  }

  public async findBySupplierAppointmentDayScheduleId(
    id: string,
  ): Promise<SupplierAppointmentDaySchedule | undefined> {
    const findSupplierAppointmentDaySchedule = await this.ormRepository.findOne(
      {
        where: { id },
      },
    );

    return findSupplierAppointmentDaySchedule;
  }

  public async create({
    start_hour,
    end_hour,
    duration_minutes,
    interval,
    supplier_id,
    week_day_id,
  }: ICreateSupplierAppointmentDayScheduleDTO): Promise<
    SupplierAppointmentDaySchedule
  > {
    const supplierAppointmentDaySchedule = this.ormRepository.create({
      start_hour,
      end_hour,
      duration_minutes,
      interval,
      supplier_id,
      week_day_id,
    });

    await this.ormRepository.save(supplierAppointmentDaySchedule);

    return supplierAppointmentDaySchedule;
  }

  public async delete({ id }: SupplierAppointmentDaySchedule): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default SupplierAppointmentDaySchedulesRepository;
