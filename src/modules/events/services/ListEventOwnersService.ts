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
    //   const users = ([] as unknown) as IEventOwnerDTO[];

    //   eventOwners.map(async owner => {
    //     users.push({
    //       id: owner.owner_id,
    //       name: owner.userEventOwner.name,
    //       avatar: owner.userEventOwner.avatar ? owner.userEventOwner.avatar : '',
    //       description: owner.description,
    //       number_of_guests: owner.number_of_guests,
    //     });
    //   });

    return eventOwners;
  }
}

export default ListEventOwnersService;
