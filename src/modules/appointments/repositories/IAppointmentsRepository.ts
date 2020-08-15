import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthSupplierDTO from '@modules/appointments/dtos/IFindAllInMonthSupplierDTO';
import IFindAllInDaySupplierDTO from '@modules/appointments/dtos/IFindAllInDaySupplierDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findAllInMonthFromSupplier(
    data: IFindAllInMonthSupplierDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromSupplier(
    data: IFindAllInDaySupplierDTO,
  ): Promise<Appointment[]>;
  // find(): Promise<void>;
  // startOfHour(data: ICreateAppointmentDTO): Promise<>;
  findByDateAndUsers(
    date: Date,
    guess_id: string,
    host_id: string,
  ): Promise<Appointment | undefined>;
  findById(id: string): Promise<Appointment | undefined>;
  delete(data: ICreateAppointmentDTO): Promise<void>;
}
