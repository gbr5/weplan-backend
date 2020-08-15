import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISupplierAppointmentDayIntervalRepository from '@modules/appointments/repositories/ISupplierAppointmentDayIntervalsRepository';

@injectable()
class DeleteSupplierAppointmentDayIntervalService {
  constructor(
    @inject('SupplierAppointmentDayIntervalsRepository')
    private appointmentsRepository: ISupplierAppointmentDayIntervalRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findSupplierAppointmentDayInterval = await this.appointmentsRepository.findBySupplierAppointmentDayIntervalId(
      id,
    );

    if (!findSupplierAppointmentDayInterval) {
      throw new AppError('Appointment day interval not found.');
    }

    await this.appointmentsRepository.delete(
      findSupplierAppointmentDayInterval,
    );
  }
}

export default DeleteSupplierAppointmentDayIntervalService;
