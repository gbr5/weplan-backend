import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEventAppointmentRepository from '@modules/appointments/repositories/IEventAppointmentsRepository';

@injectable()
class DeleteEventAppointmentService {
  constructor(
    @inject('SupplierEventAppointmentsRepository')
    private eventAppointmentsRepository: IEventAppointmentRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findEventAppointment = await this.eventAppointmentsRepository.findById(
      id,
    );

    if (!findEventAppointment) {
      throw new AppError('Appointment not found.');
    }

    await this.eventAppointmentsRepository.delete(findEventAppointment);
  }
}

export default DeleteEventAppointmentService;
