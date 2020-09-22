import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISupplierAppointmentDayIntervalRepository from '@modules/appointments/repositories/ISupplierAppointmentDayIntervalsRepository';
import SupplierAppointmentDayInterval from '../infra/typeorm/entities/SupplierAppointmentDayInterval';

@injectable()
class UpdateSupplierAppointmentDayIntervalService {
  constructor(
    @inject('SupplierAppointmentDayIntervalsRepository')
    private appointmentsRepository: ISupplierAppointmentDayIntervalRepository,
  ) {}

  public async execute(
    id: string,
    start_hour: number,
    start_minutes: number,
    duration_minutes: number,
    week_day_id: string,
  ): Promise<SupplierAppointmentDayInterval> {
    const findSupplierAppointmentDayInterval = await this.appointmentsRepository.findBySupplierAppointmentDayIntervalId(
      id,
    );

    if (!findSupplierAppointmentDayInterval) {
      throw new AppError('Appointment day interval not found.');
    }

    findSupplierAppointmentDayInterval.start_hour = start_hour;
    findSupplierAppointmentDayInterval.start_minutes = start_minutes;
    findSupplierAppointmentDayInterval.duration_minutes = duration_minutes;
    findSupplierAppointmentDayInterval.week_day_id = week_day_id;

    const updatedSupplierAppointmentDayInterval = await this.appointmentsRepository.save(
      findSupplierAppointmentDayInterval,
    );

    return updatedSupplierAppointmentDayInterval;
  }
}

export default UpdateSupplierAppointmentDayIntervalService;
