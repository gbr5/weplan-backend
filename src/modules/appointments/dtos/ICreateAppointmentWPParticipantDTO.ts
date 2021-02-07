import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateAppointmentWPParticipantDTO {
  guests: User[];
  appointment_id: string;
  host_id: string;
}
