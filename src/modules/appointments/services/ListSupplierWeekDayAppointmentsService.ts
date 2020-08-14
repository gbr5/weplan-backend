import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import SupplierWeekDayAppointment from '@modules/appointments/infra/typeorm/entities/SupplierWeekDayAppointment';
import ISupplierWeekDayAppointmentsRepository from '@modules/appointments/repositories/ISupplierWeekDayAppointmentsRepository';

@injectable()
class ListProviderSupplierWeekDayAppointmentService {
  constructor(
    @inject('SupplierWeekDayAppointmentsRepository')
    private appointmentsRepository: ISupplierWeekDayAppointmentsRepository,
  ) {}

  public async execute(
    supplier_id: string,
  ): Promise<SupplierWeekDayAppointment[]> {
    const supplierWeekDayAppointments = await this.appointmentsRepository.findBySupplierId(
      supplier_id,
    );

    return supplierWeekDayAppointments;
  }
}

export default ListProviderSupplierWeekDayAppointmentService;
