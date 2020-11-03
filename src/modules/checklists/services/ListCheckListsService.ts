import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';

@injectable()
class ListCheckListsService {
  constructor(
    @inject('CheckListsRepository')
    private checkListsRepository: ICheckListsRepository,
  ) {}

  public async execute(user_id: string): Promise<CheckList[]> {
    const checkLists = await this.checkListsRepository.findByUserId(user_id);

    return checkLists;
  }
}

export default ListCheckListsService;
