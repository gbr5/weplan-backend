import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventOwnersRepository from '../repositories/IEventOwnersRepository';
import IEventMembersRepository from '../repositories/IEventMembersRepository';
import IListUserEvent from '../dtos/IListUserEvent';
import IWeplanGuestsRepository from '../repositories/IWeplanGuestsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserEventService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<IListUserEvent[]> {
    const owner_id = user_id;
    const member_id = user_id;
    const eventsAsOwner = await this.eventOwnersRepository.findByOwnerId(
      owner_id,
    );
    const eventsAsMember = await this.eventMembersRepository.findByMemberId(
      member_id,
    );
    const eventsAsGuest = await this.weplanGuestsRepository.findByUserId(
      user_id,
    );
    const userEvents = [{} as IListUserEvent];

    eventsAsOwner.map(owner => {
      const userEventOwner = {
        id: owner.Event.id,
        userEvent_id: owner.owner_id,
        name: owner.Event.name,
        trimmed_name: owner.Event.trimmed_name,
        isOwner: true,
        owner_master: owner.Event.user_id,
        isGuest: false,
        event_type: owner.Event.event_type,
        date: owner.Event.date,
      };
      userEvents.push(userEventOwner);

      return userEventOwner;
    });
    eventsAsMember.map(member => {
      const userEventMember = {
        id: member.Event.id,
        userEvent_id: member.member_id,
        name: member.Event.name,
        trimmed_name: member.Event.trimmed_name,
        isOwner: false,
        owner_master: member.Event.user_id,
        isGuest: false,
        event_type: member.Event.event_type,
        date: member.Event.date,
      };
      userEvents.push(userEventMember);

      return userEventMember;
    });
    eventsAsGuest.map(guest => {
      const userEventMember = {
        id: guest.Event.id,
        userEvent_id: guest.Guest.id,
        name: guest.Event.name,
        trimmed_name: guest.Event.trimmed_name,
        isOwner: false,
        owner_master: guest.Event.user_id,
        isGuest: false,
        event_type: guest.Event.event_type,
        date: guest.Event.date,
      };
      userEvents.push(userEventMember);

      return userEventMember;
    });

    return userEvents;
  }
}

export default ListUserEventService;
