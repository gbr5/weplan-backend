import { getRepository, Repository } from 'typeorm';

import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';

import TaskFollower from '@modules/tasks/infra/typeorm/entities/TaskFollower';
import ICreateTaskFollowerDTO from '@modules/tasks/dtos/ICreateTaskFollowerDTO';

class TaskFollowersRepository implements ITaskFollowersRepository {
  private ormRepository: Repository<TaskFollower>;

  constructor() {
    this.ormRepository = getRepository(TaskFollower);
  }

  public async findById(id: string): Promise<TaskFollower | undefined> {
    const findTaskFollower = await this.ormRepository.findOne(id);

    return findTaskFollower;
  }

  public async findByTaskId(task_id: string): Promise<TaskFollower[]> {
    const findTaskFollower = await this.ormRepository.find({
      where: { task_id },
    });

    return findTaskFollower;
  }

  public async findByUserId(user_id: string): Promise<TaskFollower[]> {
    const findTaskFollower = await this.ormRepository.find({
      where: { user_id },
    });

    return findTaskFollower;
  }

  public async create(data: ICreateTaskFollowerDTO): Promise<TaskFollower> {
    const task = this.ormRepository.create(data);

    await this.ormRepository.save(task);

    return task;
  }

  public async save(taskFollower: TaskFollower): Promise<TaskFollower> {
    return this.ormRepository.save(taskFollower);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TaskFollowersRepository;
