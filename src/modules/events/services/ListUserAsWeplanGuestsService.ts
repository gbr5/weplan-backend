import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
// import { classToClass } from 'class-transformer';
import Guest from '../infra/typeorm/entities/Guest';
import IGuestsRepository from '../repositories/IGuestsRepository';

@injectable()
class ListWeplanGuestsService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<Guest[]> {
    // const cacheKey = `events-as-weplan-guest:${user_id}`;

    // let eventsAsWeplanGuest = await this.cacheProvider.recover<Guest[]>(
    //   cacheKey,
    // );

    // if (!eventsAsWeplanGuest) {
    console.log(user_id);
    const weplanGuests = await this.weplanGuestsRepository.findByUserId(
      user_id,
    );

    const invitedAsGuest = weplanGuests.filter(
      guest => guest.userConfirmations.length > 0,
    );
    const guestIds = invitedAsGuest.map(guest => guest.guest_id);

    const eventsAsWeplanGuest = await this.guestsRepository.findByIDs(guestIds);
    //   await this.cacheProvider.save(
    //     cacheKey,
    //     classToClass(eventsAsWeplanGuest),
    //   );
    // }

    return eventsAsWeplanGuest;
  }
}

export default ListWeplanGuestsService;
