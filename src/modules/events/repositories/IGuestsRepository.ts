import Guest from '@modules/events/infra/typeorm/entities/Guest';
import ICreateGuestDTO from '@modules/events/dtos/ICreateGuestDTO';

export default interface IGuestsRepository {
  create(data: ICreateGuestDTO): Promise<Guest>;
  findByEventFirstNameAndLastName(
    event_name: string,
    first_name: string,
    last_name: string,
  ): Promise<Guest | undefined>;
  findByEvent(event_name: string): Promise<Guest[]>;
  findByHostIdAndEvent(event_name: string, host_id: string): Promise<Guest[]>;
  save(guest: Guest): Promise<Guest>;
  delete(guest: Guest): Promise<void>;
}
