import { getRepository, Repository } from 'typeorm';

import ITaskNotesRepository from '@modules/tasks/repositories/ITaskNotesRepository';

import TaskNote from '@modules/tasks/infra/typeorm/entities/TaskNote';
import ICreateTaskNoteDTO from '@modules/tasks/dtos/ICreateTaskNoteDTO';

class TaskNotesRepository implements ITaskNotesRepository {
  private ormRepository: Repository<TaskNote>;

  constructor() {
    this.ormRepository = getRepository(TaskNote);
  }

  public async findById(id: string): Promise<TaskNote | undefined> {
    const findTaskNote = await this.ormRepository.findOne(id);

    return findTaskNote;
  }

  public async findByTaskId(task_id: string): Promise<TaskNote[]> {
    const findTaskNote = await this.ormRepository.find({
      where: { task_id },
    });

    return findTaskNote;
  }

  public async create(data: ICreateTaskNoteDTO): Promise<TaskNote> {
    const taskNote = this.ormRepository.create(data);

    await this.ormRepository.save(taskNote);

    return taskNote;
  }

  public async save(taskNote: TaskNote): Promise<TaskNote> {
    return this.ormRepository.save(taskNote);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TaskNotesRepository;
