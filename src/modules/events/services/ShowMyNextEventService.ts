import { injectable, inject } from 'tsyringe';
import { differenceInDays } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';

import Event from '@modules/events/infra/typeorm/entities/Event';
import EventOwner from '../infra/typeorm/entities/EventOwner';
import EventMember from '../infra/typeorm/entities/EventMember';

@injectable()
class ShowMyNextEventService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,
  ) {}

  public async execute(user_id: string): Promise<Event | undefined> {
    const today = new Date();
    const members = await this.eventMembersRepository.findByMemberId(user_id);
    const eventMembers = members.filter(
      member => differenceInDays(new Date(member.event.date), today) > 0,
    );

    if (!eventMembers) {
      throw new AppError('Event not found.');
    }

    const owners = await this.eventOwnersRepository.findByOwnerId(user_id);
    const eventOwners = owners.filter(
      owner => differenceInDays(new Date(owner.event.date), today) > 0,
    );

    if (!eventOwners) {
      throw new AppError('Event not found.');
    }

    const nextEvent: Event[] = [];

    const nextOwnerEvent = eventOwners
      .sort((a: EventOwner, b: EventOwner) => {
        if (
          differenceInDays(new Date(a.event.date), new Date(b.event.date)) < 0
        ) {
          return -1;
        }
        if (
          differenceInDays(new Date(a.event.date), new Date(b.event.date)) > 0
        ) {
          return 1;
        }
        return 0;
      })
      .find(e => e);

    const nextMemberEvent = eventMembers
      .sort((a: EventMember, b: EventMember) => {
        if (
          differenceInDays(new Date(a.event.date), new Date(b.event.date)) < 0
        ) {
          return -1;
        }
        if (
          differenceInDays(new Date(a.event.date), new Date(b.event.date)) > 0
        ) {
          return 1;
        }
        return 0;
      })
      .find(e => e);

    if (!nextMemberEvent && nextOwnerEvent) {
      nextEvent.push(nextOwnerEvent.event);
    }

    if (nextMemberEvent && !nextOwnerEvent) {
      nextEvent.push(nextMemberEvent.event);
    }

    if (nextMemberEvent && nextOwnerEvent) {
      if (
        differenceInDays(
          new Date(nextOwnerEvent.event.date),
          new Date(nextMemberEvent.event.date),
        ) < 0
      ) {
        nextEvent.push(nextOwnerEvent.event);
      }
      if (
        differenceInDays(
          new Date(nextOwnerEvent.event.date),
          new Date(nextMemberEvent.event.date),
        ) > 0
      ) {
        nextEvent.push(nextMemberEvent.event);
      }
    }

    return nextEvent[0];
  }
}

export default ShowMyNextEventService;
