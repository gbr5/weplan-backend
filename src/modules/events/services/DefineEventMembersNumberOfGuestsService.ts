import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import IEventNotesRepository from '../repositories/IEventNotesRepository';
import IEventMembersRepository from '../repositories/IEventMembersRepository';

interface IRequest {
  number_of_guests: number;
  event_id: string;
}

@injectable()
class DefineEventMembersNumberOfGuestsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    event_id,
    number_of_guests,
  }: IRequest): Promise<void> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) throw new AppError('Event not found.');

    event.members_number_of_guests = number_of_guests;

    const members = await this.eventMembersRepository.findByEvent(event_id);

    await this.eventsRepository.save(event);

    if (members.length > 0) {
      Promise.all([
        members.map(member => {
          return this.eventMembersRepository.save({
            ...member,
            number_of_guests,
          });
        }),
      ]);
    }
  }
}

export default DefineEventMembersNumberOfGuestsService;
