import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import SupplierAppointmentDayOff from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayOff';
import ISupplierAppointmentDaysOffRepository from '@modules/appointments/repositories/ISupplierAppointmentDaysOffRepository';

@injectable()
class ListSupplierSupplierAppointmentDayOffService {
  constructor(
    @inject('SupplierAppointmentDaysOffRepository')
    private appointmentsRepository: ISupplierAppointmentDaysOffRepository,
  ) {}

  public async execute(
    supplier_id: string,
  ): Promise<SupplierAppointmentDayOff[]> {
    const supplierWeekDayAppointments = await this.appointmentsRepository.findBySupplierId(
      supplier_id,
    );

    return supplierWeekDayAppointments;
  }
}

export default ListSupplierSupplierAppointmentDayOffService;
