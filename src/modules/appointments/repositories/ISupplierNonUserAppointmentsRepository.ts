import ICreateSupplierNonUserAppointmentDTO from '@modules/appointments/dtos/ICreateSupplierNonUserAppointmentDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import NonUserAppointmentGuest from '../infra/typeorm/entities/NonUserAppointmentGuest';

export default interface ISupplierNonUserAppointmentsRepository {
  create(
    data: ICreateSupplierNonUserAppointmentDTO,
  ): Promise<{
    id: string;
    subject: string;
    date: Date;
    duration_minutes: number;
    address: string;
    appointment_type: string;
    host: User;
    guest: NonUserAppointmentGuest;
  }>;
  delete(data: ICreateSupplierNonUserAppointmentDTO): Promise<void>;
}
