import { injectable, inject } from 'tsyringe';
import { differenceInDays } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';

import Event from '@modules/events/infra/typeorm/entities/Event';
import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
import IGuestsRepository from '../repositories/IGuestsRepository';
import IEventNotesRepository from '../repositories/IEventNotesRepository';
import IUserCheckListsRepository from '../repositories/IUserCheckListsRepository';
import IEventSupplierRepository from '../repositories/IEventSuppliersRepository';
import IShowEventDTO from '../dtos/IShowEventDTO';

@injectable()
class ShowMyNextEventService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSupplierRepository,

    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('UserCheckListsRepository')
    private userCheckListsRepository: IUserCheckListsRepository,
  ) {}

  public async execute(user_id: string): Promise<IShowEventDTO | undefined> {
    const today = new Date();
    const eMembers = await this.eventMembersRepository.findByMemberId(user_id);
    const eventMembers = eMembers.filter(
      member => differenceInDays(new Date(member.event.date), today) > 0,
    );

    const eOwners = await this.eventOwnersRepository.findByOwnerId(user_id);
    const eventOwners = eOwners.filter(
      owner => differenceInDays(new Date(owner.event.date), today) > 0,
    );

    const nextEvents: Event[] = [];

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
      nextEvents.push(nextOwnerEvent.event);
    }

    if (nextMemberEvent && !nextOwnerEvent) {
      nextEvents.push(nextMemberEvent.event);
    }

    if (nextMemberEvent && nextOwnerEvent) {
      if (
        differenceInDays(
          new Date(nextOwnerEvent.event.date),
          new Date(nextMemberEvent.event.date),
        ) < 0
      ) {
        nextEvents.push(nextOwnerEvent.event);
      }
      if (
        differenceInDays(
          new Date(nextOwnerEvent.event.date),
          new Date(nextMemberEvent.event.date),
        ) > 0
      ) {
        nextEvents.push(nextMemberEvent.event);
      }
    }
    const event = nextEvents[0];

    if (!event) {
      throw new AppError('Event not found');
    }

    const eventNotes = await this.eventNotesRepository.findByEvent(event.id);
    const suppliers = await this.eventSuppliersRepository.findByEvent(event.id);
    const guests = await this.guestsRepository.findByEvent(event.id);
    const checkLists = await this.userCheckListsRepository.findByEvent(
      event.id,
    );
    const event_avatar_url = event.getAvatarUrl();

    return {
      event,
      checkLists,
      eventNotes,
      guests,
      suppliers,
      eventDates: event.eventDates,
      eventFiles: event.eventFiles,
      eventImages: event.eventImages,
      event_avatar_url: event_avatar_url || 'n/a',
    };
  }
}

export default ShowMyNextEventService;
