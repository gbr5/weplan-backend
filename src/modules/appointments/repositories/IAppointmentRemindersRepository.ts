import AppointmentReminder from '@modules/appointments/infra/typeorm/entities/AppointmentReminder';
import ICreateAppointmentReminderDTO from '@modules/appointments/dtos/ICreateAppointmentReminderDTO';

export default interface IAppointmentRemindersRepository {
  create(data: ICreateAppointmentReminderDTO): Promise<AppointmentReminder>;
  findById(id: string): Promise<AppointmentReminder | undefined>;
  findByAppointment(appointment_id: string): Promise<AppointmentReminder[]>;
  findByReminderAndAppointment(
    data: ICreateAppointmentReminderDTO,
  ): Promise<AppointmentReminder | undefined>;
  save(data: ICreateAppointmentReminderDTO): Promise<AppointmentReminder>;
  delete(data: ICreateAppointmentReminderDTO): Promise<void>;
}
