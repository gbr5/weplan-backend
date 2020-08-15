import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import SupplierAppointmentDayInterval from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDayInterval';
import ISupplierAppointmentDayIntervalRepository from '@modules/appointments/repositories/ISupplierAppointmentDayIntervalsRepository';
import ICreatSupplierAppointmentDayIntervalDTO from '../dtos/ICreateSupplierAppointmentDayIntervalDTO';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateSupplierAppointmentDayIntervalService {
  constructor(
    @inject('SupplierAppointmentDayIntervalsRepository')
    private appointmentsRepository: ISupplierAppointmentDayIntervalRepository,
  ) {}

  public async execute({
    start_hour,
    start_minutes,
    duration_minutes,
    supplier_id,
    week_day_id,
  }: ICreatSupplierAppointmentDayIntervalDTO): Promise<
    SupplierAppointmentDayInterval
  > {
    const findSupplierAppointmentDayIntervals = await this.appointmentsRepository.findBySupplierId(
      supplier_id,
    );

    const findSupplierAppointmentDayInterval = findSupplierAppointmentDayIntervals.filter(
      weekDay => weekDay.week_day_id === week_day_id,
    );

    if (findSupplierAppointmentDayInterval === []) {
      throw new AppError('This supplier already registered this day intevral.');
    }

    const supplierAppointmentDayInterval = await this.appointmentsRepository.create(
      {
        start_hour,
        start_minutes,
        duration_minutes,
        supplier_id,
        week_day_id,
      },
    );

    return supplierAppointmentDayInterval;
  }
}

export default CreateSupplierAppointmentDayIntervalService;
