import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import SupplierAppointmentDaySchedule from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDaySchedule';
import ISupplierAppointmentDaySchedulesRepository from '@modules/appointments/repositories/ISupplierAppointmentDaySchedulesRepository';

@injectable()
class ListSupplierSupplierAppointmentDayScheduleService {
  constructor(
    @inject('SupplierAppointmentDaySchedulesRepository')
    private appointmentsRepository: ISupplierAppointmentDaySchedulesRepository,
  ) {}

  public async execute(
    supplier_id: string,
  ): Promise<SupplierAppointmentDaySchedule[]> {
    const supplierAppointmentDaySchedules = await this.appointmentsRepository.findBySupplierId(
      supplier_id,
    );

    return supplierAppointmentDaySchedules;
  }
}

export default ListSupplierSupplierAppointmentDayScheduleService;
