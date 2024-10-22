import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthSupplierDTO from '@modules/appointments/dtos/IFindAllInMonthSupplierDTO';
import IFindAllInDaySupplierDTO from '@modules/appointments/dtos/IFindAllInDaySupplierDTO';

interface IIdsDTO {
  id: string;
}

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
    host_id: string,
  ): Promise<Appointment | undefined>;
  findById(id: string): Promise<Appointment | undefined>;
  findByHostId(host_id: string): Promise<Appointment[]>;
  findByIds(ids: IIdsDTO[]): Promise<Appointment[]>;
  save(data: ICreateAppointmentDTO): Promise<Appointment>;
  delete(data: ICreateAppointmentDTO): Promise<void>;
}

/// ////////////////////////////////////////////////////////
// Consertar Appointments - ver todos os arquivos !!!!! ///
/// ////////////////////////////////////////////////////////
