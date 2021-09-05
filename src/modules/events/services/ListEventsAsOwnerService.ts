import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
// import { classToClass } from 'class-transformer';
import { differenceInMilliseconds } from 'date-fns';
import EventOwner from '../infra/typeorm/entities/EventOwner';

@injectable()
class ListEventsAsOwnerService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<EventOwner[]> {
    // const cacheKey = `events-as-owner:${user_id}`;

    // let eventsAsOwner = await this.cacheProvider.recover<EventOwner[]>(
    //   cacheKey,
    // );

    // if (!eventsAsOwner) {
    const eventsAsOwner = await this.eventOwnersRepository.findByOwnerId(
      user_id,
    );

    //   await this.cacheProvider.save(cacheKey, classToClass(eventsAsOwner));
    // }

    return eventsAsOwner.sort((a, b) => {
      if (
        differenceInMilliseconds(
          new Date(a.event.date),
          new Date(b.event.date),
        ) < 0
      ) {
        return -1;
      }
      if (
        differenceInMilliseconds(
          new Date(a.event.date),
          new Date(b.event.date),
        ) > 0
      ) {
        return 1;
      }
      return 0;
    });
  }
}

export default ListEventsAsOwnerService;
