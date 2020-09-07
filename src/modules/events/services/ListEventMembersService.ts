import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserDTO from '../dtos/IUserDTO';

@injectable()
class ListEventMembersService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IUserDTO[]> {
    const EventMembers = await this.eventMembersRepository.findByEvent(
      event_id,
    );
    const users = ([] as unknown) as Promise<IUserDTO[]>;

    EventMembers.map(async member => {
      (await users).push({
        id: member.member_id,
        name: member.Member.name,
        avatar: member.Member.avatar ? member.Member.avatar : '',
      });
    });

    return users;
  }
}

export default ListEventMembersService;
