import GuestContactInfo from '@modules/events/infra/typeorm/entities/GuestContactInfo';
import ICreateGuestContactInfoDTO from '@modules/events/dtos/ICreateGuestContactInfoDTO';

export default interface IGuestContactInfosRepository {
  create(data: ICreateGuestContactInfoDTO): Promise<GuestContactInfo>;
  findById(id: string): Promise<GuestContactInfo | undefined>;
  findByGuest(guest_id: string): Promise<GuestContactInfo[]>;
  save(guestContactInfo: GuestContactInfo): Promise<GuestContactInfo>;
  delete(guestContactInfo: GuestContactInfo): Promise<void>;
}
