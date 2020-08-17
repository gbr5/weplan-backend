import ICreateWeplanUsersAppointmentDTO from '@modules/appointments/dtos/ICreateWeplanUsersAppointmentDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import WeplanAppointmentGuest from '../infra/typeorm/entities/WeplanAppointmentGuest';

export default interface ISupplierNonUserAppointmentsRepository {
  create(
    data: ICreateWeplanUsersAppointmentDTO,
  ): Promise<{
    id: string;
    subject: string;
    date: Date;
    address: string;
    appointment_type: string;
    host: User;
    guest: WeplanAppointmentGuest;
  }>;
  delete(data: ICreateWeplanUsersAppointmentDTO): Promise<void>;
}
