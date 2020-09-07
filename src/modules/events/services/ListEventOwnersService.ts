import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventOwnerDTO from '../dtos/IEventOwnerDTO';

@injectable()
class ListEventOwnersService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IEventOwnerDTO[]> {
    const eventOwners = await this.eventOwnersRepository.findByEvent(event_id);
    const users = ([] as unknown) as IEventOwnerDTO[];

    eventOwners.map(async owner => {
      console.log('42 - owner: ', owner);

      users.push({
        id: owner.owner_id,
        name: owner.Owner.name,
        avatar: owner.Owner.avatar ? owner.Owner.avatar : '',
        description: owner.description,
        // first_name: user ? user.first_name : '',
        // last_name: user ? user.last_name : '',
      });
      console.log('62 - users: ', users);
    });
    console.log('65 - users: ', users);

    return users;
  }
}

export default ListEventOwnersService;
