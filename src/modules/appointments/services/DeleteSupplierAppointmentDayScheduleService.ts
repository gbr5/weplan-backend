import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISupplierAppointmentDayScheduleRepository from '@modules/appointments/repositories/ISupplierAppointmentDaySchedulesRepository';

@injectable()
class DeleteSupplierAppointmentDayScheduleService {
  constructor(
    @inject('SupplierAppointmentDaySchedulesRepository')
    private appointmentsRepository: ISupplierAppointmentDayScheduleRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findSupplierAppointmentDaySchedule = await this.appointmentsRepository.findBySupplierAppointmentDayScheduleId(
      id,
    );

    if (!findSupplierAppointmentDaySchedule) {
      throw new AppError('Appointment day schedule not found.');
    }

    await this.appointmentsRepository.delete(
      findSupplierAppointmentDaySchedule,
    );
  }
}

export default DeleteSupplierAppointmentDayScheduleService;
