import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateWeplanUsersAppointmentDTO {
  subject: string;
  date: Date;
  address: string;
  appointment_type: string;
  weplanGuest: boolean;
  host_id: string;
  guests: User[];
  duration_minutes: number;
}
