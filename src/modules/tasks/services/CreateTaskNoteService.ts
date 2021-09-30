import { injectable, inject } from 'tsyringe';

import TaskNote from '@modules/tasks/infra/typeorm/entities/TaskNote';
import ITaskNotesRepository from '@modules/tasks/repositories/ITaskNotesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  user_id: string;
  task_id: string;
  note: string;
}

@injectable()
class CreateTaskNoteService {
  constructor(
    @inject('TaskNotesRepository')
    private taskNotesRepository: ITaskNotesRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    task_id,
    note,
    user_id,
  }: IRequest): Promise<TaskNote> {
    const newNote = await this.notesRepository.create({
      author_id: user_id,
      isNew: true,
      note,
    });

    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError(' task not found.');
    }

    const taskNote = await this.taskNotesRepository.create({
      task_id,
      note_id: newNote.id,
    });

    return taskNote;
  }
}

export default CreateTaskNoteService;
