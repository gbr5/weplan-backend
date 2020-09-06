import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventMemberDTO from '../dtos/IEventMemberDTO';

@injectable()
class ListEventMembersService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IEventMemberDTO[]> {
    const EventMembers = await this.eventMembersRepository.findByEvent(
      event_id,
    );
    const users = ([] as unknown) as Promise<IEventMemberDTO[]>;

    EventMembers.map(async member => {
      (await users).push({
        id: member.member_id,
        name: member.Member.name,
        avatar: member.Member.avatar ? member.Member.avatar : '',
        trimmed_name: member.Member.trimmed_name,
      });
    });

    return users;
  }
}

export default ListEventMembersService;
