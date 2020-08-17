import AppointmentDuration from '@modules/appointments/infra/typeorm/entities/AppointmentDuration';
import ICreateAppointmentDurationDTO from '@modules/appointments/dtos/ICreateAppointmentDurationDTO';

export default interface IAppointmentDurationsRepository {
  create(data: ICreateAppointmentDurationDTO): Promise<AppointmentDuration>;
  findByAppointmentId(host_id: string): Promise<AppointmentDuration[]>;
}
