import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  // find(): Promise<void>;
  // startOfHour(data: ICreateAppointmentDTO): Promise<>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
