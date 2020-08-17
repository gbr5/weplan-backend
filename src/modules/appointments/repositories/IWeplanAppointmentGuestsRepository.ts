import WeplanAppointmentGuest from '@modules/appointments/infra/typeorm/entities/WeplanAppointmentGuest';
import ICreateWeplanAppointmentGuestDTO from '@modules/appointments/dtos/ICreateWeplanAppointmentGuestDTO';

export default interface IWeplanAppointmentGuestsRepository {
  create(
    data: ICreateWeplanAppointmentGuestDTO,
  ): Promise<WeplanAppointmentGuest>;
  // findByDateAndSupplier(
  //   date: Date,
  //   guest_id: string,
  //   host_id: string,
  // ): Promise<WeplanAppointmentGuest | undefined>;
  findByHostId(host_id: string): Promise<WeplanAppointmentGuest[]>;
  findById(id: string): Promise<WeplanAppointmentGuest | undefined>;
  delete(data: ICreateWeplanAppointmentGuestDTO): Promise<void>;
}
