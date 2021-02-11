import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentReminderRepository from '@modules/appointments/repositories/IAppointmentRemindersRepository';

@injectable()
class DeleteAppointmentReminderService {
  constructor(
    @inject('AppointmentRemindersRepository')
    private appointmentRemindersRepository: IAppointmentReminderRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findAppointmentReminder = await this.appointmentRemindersRepository.findById(
      id,
    );

    if (!findAppointmentReminder) {
      throw new AppError('AppointmentReminder not found.');
    }

    await this.appointmentRemindersRepository.delete(findAppointmentReminder);
  }
}

export default DeleteAppointmentReminderService;
