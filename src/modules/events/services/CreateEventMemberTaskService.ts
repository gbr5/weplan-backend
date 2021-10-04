import { injectable, inject } from 'tsyringe';

import EventTask from '@modules/events/infra/typeorm/entities/EventTask';
import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import IEventNotesRepository from '../repositories/IEventNotesRepository';

interface IRequest extends ICreateTaskDTO {
  user_id: string;
  member_id: string;
  event_id: string;
}

@injectable()
class CreateEventMemberTaskService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('TaskFollowersRepository')
    private taskFollowersRepository: ITaskFollowersRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

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
    user_id,
    member_id,
  }: IRequest): Promise<EventTask> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) throw new AppError('Event not found.');

    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Event not found.');

    const member = await this.usersRepository.findById(member_id);

    if (!member) throw new AppError('Event not found.');

    const task = await this.tasksRepository.create({
      user_id,
      title,
      priority,
      status,
      due_date,
    });

    const eventTask = await this.eventTasksRepository.create({
      event_id,
      task_id: task.id,
    });

    const note = `
Nova tarefa: ${title}
    `;

    const newNote = await this.notesRepository.create({
      author_id: event_id,
      isNew: true,
      note,
    });
    Promise.all([
      await this.eventNotesRepository.create({
        event_id,
        note_id: newNote.id,
      }),
      await this.taskFollowersRepository.create({
        task_id: task.id,
        type: 'master',
        user_id: user.id,
      }),
      await this.taskFollowersRepository.create({
        task_id: task.id,
        type: 'member',
        user_id: member.id,
      }),
    ]);

    return eventTask;
  }
}

export default CreateEventMemberTaskService;
