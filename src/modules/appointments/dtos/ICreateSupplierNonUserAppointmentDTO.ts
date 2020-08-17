export default interface ICreateSupplierNonUserAppointmentDTO {
  subject: string;
  date: Date;
  address: string;
  appointment_type: string;
  weplanGuest: boolean;
  host_id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
}
