import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import IEventSupplierRepository from '../repositories/IEventSuppliersRepository';
import IGuestsRepository from '../repositories/IGuestsRepository';
import IEventNotesRepository from '../repositories/IEventNotesRepository';
import IUserCheckListsRepository from '../repositories/IUserCheckListsRepository';
import IEventDatesRepository from '../repositories/IEventDatesRepository';
import Event from '../infra/typeorm/entities/Event';

@injectable()
class ShowEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSupplierRepository,

    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('EventDatesRepository')
    private eventDatesRepository: IEventDatesRepository,

    @inject('UserCheckListsRepository')
    private userCheckListsRepository: IUserCheckListsRepository,
  ) {}

  public async execute(event_id: string): Promise<Event> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    return event;
  }
}

export default ShowEventService;
