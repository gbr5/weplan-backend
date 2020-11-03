import { getRepository, Repository } from 'typeorm';

import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';

import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import ICreateCheckListTaskDTO from '@modules/checklists/dtos/ICreateCheckListTaskDTO';

class CheckListTasksRepository implements ICheckListTasksRepository {
  private ormRepository: Repository<CheckListTask>;

  constructor() {
    this.ormRepository = getRepository(CheckListTask);
  }

  public async findById(id: string): Promise<CheckListTask | undefined> {
    const findCheckListTask = await this.ormRepository.findOne({ id });

    return findCheckListTask;
  }

  public async findByOwnerId(owner_id: string): Promise<CheckListTask[]> {
    const checkListTasks = await this.ormRepository.find({
      where: { owner_id },
    });

    return checkListTasks;
  }

  public async findByCheckListId(
    check_list_id: string,
  ): Promise<CheckListTask[]> {
    const checkListTasks = await this.ormRepository.find({
      where: { check_list_id },
    });

    return checkListTasks;
  }

  public async create(data: ICreateCheckListTaskDTO): Promise<CheckListTask> {
    const checkListTask = await this.ormRepository.create(data);

    await this.ormRepository.save(checkListTask);

    return checkListTask;
  }

  public async save(checkListTask: CheckListTask): Promise<CheckListTask> {
    return this.ormRepository.save(checkListTask);
  }

  public async delete({ id }: CheckListTask): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default CheckListTasksRepository;
