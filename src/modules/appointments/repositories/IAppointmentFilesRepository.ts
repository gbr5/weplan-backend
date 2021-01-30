import AppointmentFile from '@modules/appointments/infra/typeorm/entities/AppointmentFile';
import ICreateAppointmentFileDTO from '@modules/appointments/dtos/ICreateAppointmentFileDTO';

export default interface IAppointmentFilesRepository {
  create(data: ICreateAppointmentFileDTO): Promise<AppointmentFile>;
  findById(id: string): Promise<AppointmentFile | undefined>;
  findByAppointment(appointment_id: string): Promise<AppointmentFile[]>;
  findByFileAndAppointment(
    data: ICreateAppointmentFileDTO,
  ): Promise<AppointmentFile | undefined>;
  save(data: ICreateAppointmentFileDTO): Promise<AppointmentFile>;
  delete(data: ICreateAppointmentFileDTO): Promise<void>;
}
