import EventAppointment from '@modules/appointments/infra/typeorm/entities/EventAppointment';
import ICreateEventAppointmentDTO from '@modules/appointments/dtos/ICreateEventAppointmentDTO';

export default interface IEventAppointmentsRepository {
  create(data: ICreateEventAppointmentDTO): Promise<EventAppointment>;
  // findByDateAndSupplier(
  //   date: Date,
  //   guest_id: string,
  //   host_id: string,
  // ): Promise<EventAppointment | undefined>;
  findByEventId(event_id: string): Promise<EventAppointment[]>;
  findBySupplierId(supplier_id: string): Promise<EventAppointment[]>;
  findById(id: string): Promise<EventAppointment | undefined>;
  delete(data: ICreateEventAppointmentDTO): Promise<void>;
}
