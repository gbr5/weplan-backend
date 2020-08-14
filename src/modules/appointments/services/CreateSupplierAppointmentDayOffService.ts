import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import SupplierAppointmentDayOff from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayOff';
import ISupplierAppointmentDayOffRepository from '@modules/appointments/repositories/ISupplierAppointmentDaysOffRepository';

interface IRequest {
  supplier_id: string;
  day_off: Date;
}

// Dependency Inversion (SOLID principles)
@injectable()
class CreateSupplierAppointmentDayOffService {
  constructor(
    @inject('SupplierAppointmentDaysOffRepository')
    private appointmentsRepository: ISupplierAppointmentDayOffRepository,
  ) {}

  public async execute({
    supplier_id,
    day_off,
  }: IRequest): Promise<SupplierAppointmentDayOff> {
    const findSupplierAppointmentDaysOff = await this.appointmentsRepository.findBySupplierId(
      supplier_id,
    );

    console.log(day_off);

    const findSupplierAppointmentDayOff = findSupplierAppointmentDaysOff.filter(
      weekDay => weekDay.day_off === day_off,
    );
    console.log(findSupplierAppointmentDayOff);

    if (findSupplierAppointmentDayOff === []) {
      throw new AppError('This supplier already registered this day off.');
    }

    const supplierWeekDayAppointment = await this.appointmentsRepository.create(
      {
        supplier_id,
        day_off,
      },
    );

    return supplierWeekDayAppointment;
  }
}

export default CreateSupplierAppointmentDayOffService;
