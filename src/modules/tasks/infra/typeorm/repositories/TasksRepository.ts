import { getRepository, Repository } from 'typeorm';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async findById(id: string): Promise<Task | undefined> {
    const findTask = await this.ormRepository.findOne({ id });

    return findTask;
  }

  public async findByUserId(user_id: string): Promise<Task[]> {
    const checkLists = await this.ormRepository.find({
      where: { user_id },
    });

    return checkLists;
  }

  public async create(data: ICreateTaskDTO): Promise<Task> {
    const checkList = this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(checkList: Task): Promise<Task> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: Task): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default TasksRepository;
