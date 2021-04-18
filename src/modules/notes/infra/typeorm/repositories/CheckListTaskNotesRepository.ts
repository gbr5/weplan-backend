import { getRepository, Repository } from 'typeorm';

import ICheckListTaskNotesRepository from '@modules/notes/repositories/ICheckListTaskNotesRepository';

import CheckListTaskNote from '@modules/notes/infra/typeorm/entities/CheckListTaskNote';

interface ICreateCheckListTaskNote {
  task_id: string;
  note_id: string;
}

class CheckListTaskNotesRepository implements ICheckListTaskNotesRepository {
  private ormRepository: Repository<CheckListTaskNote>;

  constructor() {
    this.ormRepository = getRepository(CheckListTaskNote);
  }

  public async findById(id: string): Promise<CheckListTaskNote | undefined> {
    const findCheckListTaskNote = await this.ormRepository.findOne({ id });

    return findCheckListTaskNote;
  }

  public async findByAuthorId(author_id: string): Promise<CheckListTaskNote[]> {
    const checkListTasks = await this.ormRepository.find({
      where: { author_id },
    });

    return checkListTasks;
  }

  public async findByTaskId(task_id: string): Promise<CheckListTaskNote[]> {
    const checkListTasks = await this.ormRepository.find({
      where: { task_id },
    });

    return checkListTasks;
  }

  public async create(
    data: ICreateCheckListTaskNote,
  ): Promise<CheckListTaskNote> {
    const checkListTask = await this.ormRepository.create(data);

    await this.ormRepository.save(checkListTask);

    return checkListTask;
  }

  public async save(
    checkListTask: CheckListTaskNote,
  ): Promise<CheckListTaskNote> {
    return this.ormRepository.save(checkListTask);
  }

  public async delete({ id }: CheckListTaskNote): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default CheckListTaskNotesRepository;
