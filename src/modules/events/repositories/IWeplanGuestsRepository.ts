import WeplanGuest from '@modules/events/infra/typeorm/entities/WeplanGuest';
import ICreateWeplanGuestDTO from '@modules/events/dtos/ICreateWeplanGuestDTO';

export default interface IWeplanGuestsRepository {
  create(data: ICreateWeplanGuestDTO): Promise<WeplanGuest>;
  findByGuestId(guest_id: string): Promise<WeplanGuest | undefined>;
  findByGuestAndUserId(
    guest_id: string,
    user_id: string,
  ): Promise<WeplanGuest | undefined>;
  save(weplanGuest: WeplanGuest): Promise<WeplanGuest>;
  delete(weplanGuest: WeplanGuest): Promise<void>;
}