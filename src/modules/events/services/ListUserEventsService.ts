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
        id: owner.event.id,
        userEvent_id: owner.owner_id,
        name: owner.event.name,
        trimmed_name: owner.event.trimmed_name,
        number_of_guests: owner.number_of_guests,
        isOwner: true,
        owner_master: owner.event.user_id,
        isGuest: false,
        event_type: owner.event.event_type,
        date: owner.event.date,
      };
      userEvents.push(userEventOwner);

      return userEventOwner;
    });
    eventsAsMember.map(member => {
      const userEventMember = {
        id: member.event.id,
        userEvent_id: member.member_id,
        name: member.event.name,
        trimmed_name: member.event.trimmed_name,
        number_of_guests: member.number_of_guests,
        isOwner: false,
        owner_master: member.event.user_id,
        isGuest: false,
        event_type: member.event.event_type,
        date: member.event.date,
      };
      userEvents.push(userEventMember);

      return userEventMember;
    });
    eventsAsGuest.map(guest => {
      const userEventMember = {
        id: guest.event.id,
        userEvent_id: guest.guest.id,
        name: guest.event.name,
        trimmed_name: guest.event.trimmed_name,
        number_of_guests: 0,
        isOwner: false,
        owner_master: guest.event.user_id,
        isGuest: false,
        event_type: guest.event.event_type,
        date: guest.event.date,
      };
      userEvents.push(userEventMember);

      return userEventMember;
    });

    return userEvents;
  }
}

export default ListUserEventService;
