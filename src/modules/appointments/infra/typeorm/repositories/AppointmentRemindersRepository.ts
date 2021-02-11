import { getRepository, Repository } from 'typeorm';

import IAppointmentRemindersRepository from '@modules/appointments/repositories/IAppointmentRemindersRepository';
import ICreateAppointmentReminderDTO from '@modules/appointments/dtos/ICreateAppointmentReminderDTO';

import AppointmentReminder from '@modules/appointments/infra/typeorm/entities/AppointmentReminder';

class AppointmentRemindersRepository
  implements IAppointmentRemindersRepository {
  private ormRepository: Repository<AppointmentReminder>;

  constructor() {
    this.ormRepository = getRepository(AppointmentReminder);
  }

  public async findByReminderAndAppointment({
    appointment_id,
    date,
    reminder_type,
  }: ICreateAppointmentReminderDTO): Promise<AppointmentReminder | undefined> {
    const findAppointmentReminder = await this.ormRepository.findOne({
      where: { appointment_id, date, reminder_type },
    });

    return findAppointmentReminder;
  }

  public async findById(id: string): Promise<AppointmentReminder | undefined> {
    const findAppointmentReminder = await this.ormRepository.findOne({ id });

    return findAppointmentReminder;
  }

  public async findByAppointment(
    appointment_id: string,
  ): Promise<AppointmentReminder[]> {
    const findAppointmentReminder = await this.ormRepository.find({
      where: { appointment_id },
    });

    return findAppointmentReminder;
  }

  public async create(
    data: ICreateAppointmentReminderDTO,
  ): Promise<AppointmentReminder> {
    const appointment = this.ormRepository.create(data);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async delete({ id }: AppointmentReminder): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }

  public async save(
    appointment: AppointmentReminder,
  ): Promise<AppointmentReminder> {
    return this.ormRepository.save(appointment);
  }
}

export default AppointmentRemindersRepository;
