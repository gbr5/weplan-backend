import GuestContact from '@modules/events/infra/typeorm/entities/GuestContact';
import ICreateGuestContactDTO from '@modules/events/dtos/ICreateGuestContactDTO';

export default interface IGuestContactsRepository {
  create(data: ICreateGuestContactDTO): Promise<GuestContact>;
  findById(id: string): Promise<GuestContact | undefined>;
  findByGuest(guest_id: string): Promise<GuestContact[]>;
  save(guestContact: GuestContact): Promise<GuestContact>;
  delete(guestContact: GuestContact): Promise<void>;
}
