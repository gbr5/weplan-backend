import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findAppointment = await this.appointmentsRepository.findById(id);

    if (!findAppointment) {
      throw new AppError('Appointment not found.');
    }

    await this.appointmentsRepository.delete(findAppointment);
  }
}

export default DeleteAppointmentService;
