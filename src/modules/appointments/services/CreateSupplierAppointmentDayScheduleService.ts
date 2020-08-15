import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import SupplierAppointmentDaySchedule from '@modules/appointments/infra/typeorm/entities/SupplierAppointmentDaySchedule';
import ISupplierAppointmentDayScheduleRepository from '@modules/appointments/repositories/ISupplierAppointmentDaySchedulesRepository';
import ICreatSupplierAppointmentDayScheduleDTO from '../dtos/ICreateSupplierAppointmentDayScheduleDTO';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateSupplierAppointmentDayScheduleService {
  constructor(
    @inject('SupplierAppointmentDaySchedulesRepository')
    private appointmentsRepository: ISupplierAppointmentDayScheduleRepository,
  ) {}

  public async execute({
    start_hour,
    end_hour,
    duration_minutes,
    interval,
    supplier_id,
    week_day_id,
  }: ICreatSupplierAppointmentDayScheduleDTO): Promise<
    SupplierAppointmentDaySchedule
  > {
    const findSupplierAppointmentDaySchedules = await this.appointmentsRepository.findBySupplierId(
      supplier_id,
    );

    const findSupplierAppointmentDaySchedule = findSupplierAppointmentDaySchedules.filter(
      weekDay => weekDay.week_day_id === week_day_id,
    );

    if (findSupplierAppointmentDaySchedule === []) {
      throw new AppError(
        'This supplier already registered this day schedule format.',
      );
    }

    const supplierAppointmentDaySchedule = await this.appointmentsRepository.create(
      {
        start_hour,
        end_hour,
        duration_minutes,
        interval,
        supplier_id,
        week_day_id,
      },
    );

    return supplierAppointmentDaySchedule;
  }
}

export default CreateSupplierAppointmentDayScheduleService;
