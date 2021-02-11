import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import AppointmentReminder from '@modules/appointments/infra/typeorm/entities/AppointmentReminder';
import ICreateAppointmentRemindersDTO from '@modules/appointments/dtos/ICreateAppointmentReminderDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentRemindersRepository from '../repositories/IAppointmentRemindersRepository';

@injectable()
class CreateAppointmentReminderService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('AppointmentRemindersRepository')
    private appointmentRemindersRepository: IAppointmentRemindersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    appointment_id,
    date,
    reminder_type,
  }: ICreateAppointmentRemindersDTO): Promise<AppointmentReminder> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new AppError('Appointment not found.');
    }

    const appointmentReminder = await this.appointmentRemindersRepository.create(
      {
        appointment_id,
        date,
        reminder_type,
      },
    );

    return appointmentReminder;
  }
}

export default CreateAppointmentReminderService;
