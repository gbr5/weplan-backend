import AppointmentType from '@modules/appointments/infra/typeorm/entities/AppointmentType';

export default interface IAppointmentTypesRepository {
  create(name: string): Promise<AppointmentType>;
  findByName(name: string): Promise<AppointmentType | undefined>;
  find(): Promise<AppointmentType[]>;
}
