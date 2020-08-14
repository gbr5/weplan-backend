import { getRepository, Repository } from 'typeorm';

import ISupplierWeekDayAppointmentsRepository from '@modules/appointments/repositories/ISupplierWeekDayAppointmentsRepository';
import ICreateSupplierWeekDayAppointmentDTO from '@modules/appointments/dtos/ICreateSupplierWeekDayAppointmentDTO';

import SupplierWeekDayAppointment from '@modules/appointments/infra/typeorm/entities/SupplierWeekDayAppointment';

class SupplierWeekDayAppointmentsRepository
  implements ISupplierWeekDayAppointmentsRepository {
  private ormRepository: Repository<SupplierWeekDayAppointment>;

  constructor() {
    this.ormRepository = getRepository(SupplierWeekDayAppointment);
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<SupplierWeekDayAppointment[]> {
    const findSupplierWeekDayAppointment = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findSupplierWeekDayAppointment;
  }

  public async findByWeekDayId(
    id: string,
  ): Promise<SupplierWeekDayAppointment | undefined> {
    const findSupplierWeekDayAppointment = await this.ormRepository.findOne({
      where: { id },
    });

    return findSupplierWeekDayAppointment;
  }

  public async create({
    supplier_id,
    week_day,
  }: ICreateSupplierWeekDayAppointmentDTO): Promise<
    SupplierWeekDayAppointment
  > {
    const supplierWeekDayAppointment = this.ormRepository.create({
      supplier_id,
      week_day,
    });

    await this.ormRepository.save(supplierWeekDayAppointment);

    return supplierWeekDayAppointment;
  }

  public async delete({ id }: SupplierWeekDayAppointment): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default SupplierWeekDayAppointmentsRepository;
