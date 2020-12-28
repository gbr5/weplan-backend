import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
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
    const cacheKey = `events-as-owner:${user_id}`;

    let eventsAsOwner = await this.cacheProvider.recover<EventOwner[]>(
      cacheKey,
    );

    if (!eventsAsOwner) {
      eventsAsOwner = await this.eventOwnersRepository.findByOwnerId(user_id);

      await this.cacheProvider.save(cacheKey, classToClass(eventsAsOwner));
    }

    return eventsAsOwner;
  }
}

export default ListEventsAsOwnerService;
