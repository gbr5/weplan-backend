import { injectable, inject } from 'tsyringe';

import EventTask from '@modules/events/infra/typeorm/entities/EventTask';
import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateEventTaskDTO from '../dtos/ICreateEventTaskDTO';
import IEventsRepository from '../repositories/IEventsRepository';
import IEventNotesRepository from '../repositories/IEventNotesRepository';

@injectable()
class CreateEventTaskService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

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
    title,
    priority,
    status,
    due_date,
  }: ICreateEventTaskDTO): Promise<EventTask> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const eventTask = await this.eventTasksRepository.create({
      event_id,
      title,
      priority,
      status,
      due_date,
    });

    const note = `
Nova tarefa: ${title}
    `;

    const newNote = await this.notesRepository.create({
      author_id: event_id,
      isNew: true,
      note,
    });
    await this.eventNotesRepository.create({
      event_id,
      note_id: newNote.id,
    });

    return eventTask;
  }
}

export default CreateEventTaskService;
