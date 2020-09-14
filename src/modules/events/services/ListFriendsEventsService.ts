import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IFriendsEventsDTO from '@modules/events/dtos/IFriendsEventsDTO';

@injectable()
class ListWeplanGuestsService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<IFriendsEventsDTO[]> {
    const weplanGuests = await this.weplanGuestsRepository.findByUserId(
      user_id,
    );
    const users = ([] as unknown) as Promise<IFriendsEventsDTO[]>;

    weplanGuests.map(async guest => {
      (await users).push({
        guest_id: guest.Guest.id,
        event_name: guest.Event.name,
        host: guest.Event.user_id,
        date: guest.Event.date,
        confirmed: guest.Guest.confirmed,
      });
    });

    return users;
  }
}

export default ListWeplanGuestsService;
