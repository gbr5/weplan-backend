export default interface ICreatAppointmentDTO {
  subject: string;
  date: Date;
  duration_minutes: number;
  address: string;
  appointment_type: string;
  weplanGuest: boolean;
  guest: boolean;
  host_id: string;
}
