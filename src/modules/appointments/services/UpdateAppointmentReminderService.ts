import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentReminderRepository from '@modules/appointments/repositories/IAppointmentRemindersRepository';
import AppointmentReminder from '../infra/typeorm/entities/AppointmentReminder';

@injectable()
class UpdateAppointmentReminderService {
  constructor(
    @inject('AppointmentRemindersRepository')
    private appointmentRemindersRepository: IAppointmentReminderRepository,
  ) {}

  public async execute(
    id: string,
    date: Date,
    reminder_type: string,
  ): Promise<AppointmentReminder> {
    const findAppointmentReminder = await this.appointmentRemindersRepository.findById(
      id,
    );

    if (!findAppointmentReminder) {
      throw new AppError('AppointmentReminder day interval not found.');
    }

    findAppointmentReminder.reminder_type = reminder_type;
    findAppointmentReminder.date = date;

    const updatedAppointmentReminder = await this.appointmentRemindersRepository.save(
      findAppointmentReminder,
    );

    return updatedAppointmentReminder;
  }
}

export default UpdateAppointmentReminderService;
