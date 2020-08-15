import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import SupplierAppointmentDayInterval from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayInterval';
import ISupplierAppointmentDayIntervalsRepository from '@modules/appointments/repositories/ISupplierAppointmentDayIntervalsRepository';

@injectable()
class ListSupplierSupplierAppointmentDayIntervalService {
  constructor(
    @inject('SupplierAppointmentDayIntervalsRepository')
    private appointmentsRepository: ISupplierAppointmentDayIntervalsRepository,
  ) {}

  public async execute(
    supplier_id: string,
  ): Promise<SupplierAppointmentDayInterval[]> {
    const supplierAppointmentDayIntervals = await this.appointmentsRepository.findBySupplierId(
      supplier_id,
    );

    return supplierAppointmentDayIntervals;
  }
}

export default ListSupplierSupplierAppointmentDayIntervalService;
