import NonUserAppointmentGuest from '@modules/appointments/infra/typeorm/entities/NonUserAppointmentGuest';
import ICreateNonUserAppointmentGuestDTO from '@modules/appointments/dtos/ICreateNonUserAppointmentGuestDTO';

export default interface INonUserAppointmentGuestsRepository {
  create(
    data: ICreateNonUserAppointmentGuestDTO,
  ): Promise<NonUserAppointmentGuest>;
  // findByDateAndSupplier(
  //   date: Date,
  //   guest_id: string,
  //   host_id: string,
  // ): Promise<NonUserAppointmentGuest | undefined>;
  findBySupplierId(supplier_id: string): Promise<NonUserAppointmentGuest[]>;
  findById(id: string): Promise<NonUserAppointmentGuest | undefined>;
  delete(data: ICreateNonUserAppointmentGuestDTO): Promise<void>;
}
