import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventOwnersService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_name: string): Promise<EventOwner[]> {
    const EventOwners = await this.eventOwnersRepository.findByEvent(
      event_name,
    );

    return EventOwners;
  }
}

export default ListEventOwnersService;
