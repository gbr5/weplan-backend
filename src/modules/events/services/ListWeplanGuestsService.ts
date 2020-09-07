import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserDTO from '../dtos/IUserDTO';

@injectable()
class ListWeplanGuestsService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IUserDTO[]> {
    const WeplanGuests = await this.weplanGuestsRepository.findByEventId(
      event_id,
    );
    const users = ([] as unknown) as Promise<IUserDTO[]>;

    WeplanGuests.map(async guest => {
      (await users).push({
        id: guest.UserGuest.id,
        name: guest.UserGuest.name,
        avatar: guest.UserGuest.avatar ? guest.UserGuest.avatar : '',
      });
    });

    return users;
  }
}

export default ListWeplanGuestsService;
