import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';

import EventTask from '@modules/events/infra/typeorm/entities/EventTask';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import IEventNotesRepository from '../repositories/IEventNotesRepository';

interface IRequest {
  id: string;
  title: string;
  priority: 'low' | 'neutral' | 'high';
  status: 'not started' | 'running' | 'finnished';
  due_date: Date;
}
@injectable()
class UpdateEventTaskService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({
    id,
    priority,
    status,
    title,
    due_date,
  }: IRequest): Promise<EventTask> {
    const eventTask = await this.eventTasksRepository.findById(id);

    if (!eventTask) throw new AppError('EventTask not found.');

    if (status === 'finnished' && eventTask.status !== 'finnished') {
      const note = `
Tarefa ${title} concluída!
`;
      const newNote = await this.notesRepository.create({
        author_id: eventTask.event_id,
        isNew: true,
        note,
      });
      await this.eventNotesRepository.create({
        event_id: eventTask.event_id,
        note_id: newNote.id,
      });
    }

    eventTask.due_date = due_date;
    eventTask.priority = priority;
    eventTask.status = status;
    eventTask.title = title;

    const updatedEventTask = await this.eventTasksRepository.save(eventTask);

    return updatedEventTask;
  }
}

export default UpdateEventTaskService;
