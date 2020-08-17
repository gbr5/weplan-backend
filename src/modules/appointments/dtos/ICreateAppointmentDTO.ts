export default interface ICreatAppointmentDTO {
  subject: string;
  date: Date;
  address: string;
  appointment_type: string;
  weplanGuest: boolean;
  host_id: string;
}
