export default interface ICreateWeplanUsersAppointmentDTO {
  subject: string;
  date: Date;
  address: string;
  appointment_type: string;
  weplanGuest: boolean;
  host_id: string;
  guest_id: string;
  duration_minutes: number;
}
