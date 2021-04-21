import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';

@injectable()
class ShowCheckListService {
  constructor(
    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,
  ) {}

  public async execute(id: string): Promise<CheckList | undefined> {
    const checkLists = await this.checkListsRepository.findById(id);

    return checkLists;
  }
}

export default ShowCheckListService;
