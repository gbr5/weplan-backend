import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import IEventSupplierRepository from '../repositories/IEventSuppliersRepository';
import IGuestsRepository from '../repositories/IGuestsRepository';
import IEventNotesRepository from '../repositories/IEventNotesRepository';
import IUserCheckListsRepository from '../repositories/IUserCheckListsRepository';
import IShowEventDTO from '../dtos/IShowEventDTO';

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

    @inject('UserCheckListsRepository')
    private userCheckListsRepository: IUserCheckListsRepository,
  ) {}

  public async execute(event_id: string): Promise<IShowEventDTO> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const eventNotes = await this.eventNotesRepository.findByEvent(event.id);
    const suppliers = await this.eventSuppliersRepository.findByEvent(event.id);
    const guests = await this.guestsRepository.findByEvent(event.id);
    const checkLists = await this.userCheckListsRepository.findByEvent(
      event.id,
    );

    return {
      event,
      checkLists,
      eventNotes,
      guests,
      suppliers,
    };
  }
}

export default ShowEventService;
