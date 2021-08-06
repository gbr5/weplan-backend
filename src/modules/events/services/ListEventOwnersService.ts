import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import EventOwner from '../infra/typeorm/entities/EventOwner';

@injectable()
class ListEventOwnersService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<EventOwner[]> {
    const eventOwners = await this.eventOwnersRepository.findByEvent(event_id);

    return eventOwners;
  }
}

export default ListEventOwnersService;
