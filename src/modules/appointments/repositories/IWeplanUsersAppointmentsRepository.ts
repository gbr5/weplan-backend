import ICreateWeplanUsersAppointmentDTO from '@modules/appointments/dtos/ICreateWeplanUsersAppointmentDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface ISupplierNonUserAppointmentsRepository {
  create(
    data: ICreateWeplanUsersAppointmentDTO,
  ): Promise<{
    id: string;
    subject: string;
    date: Date;
    duration_minutes: number;
    address: string;
    appointment_type: string;
    host: User;
    guest: User;
  }>;
  delete(data: ICreateWeplanUsersAppointmentDTO): Promise<void>;
}
