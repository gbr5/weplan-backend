import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CheckListTaskNote from '@modules/notes/infra/typeorm/entities/CheckListTaskNote';
import ICheckListTaskNotesRepository from '@modules/notes/repositories/ICheckListTaskNotesRepository';

@injectable()
class ListCheckListTaskNotesService {
  constructor(
    @inject('CheckListTaskNotesRepository')
    private checkListTaskNotesRepository: ICheckListTaskNotesRepository,
  ) {}

  public async execute(task_id: string): Promise<CheckListTaskNote[]> {
    const checkLists = await this.checkListTaskNotesRepository.findByTaskId(
      task_id,
    );

    return checkLists;
  }
}

export default ListCheckListTaskNotesService;
