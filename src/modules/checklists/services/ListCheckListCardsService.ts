import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CardCheckList from '@modules/checklists/infra/typeorm/entities/CardCheckList';
import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';

@injectable()
class ListCheckListCardsService {
  constructor(
    @inject('CardCheckListsRepository')
    private cardCheckListRepository: ICardCheckListsRepository,
  ) {}

  public async execute(check_list_id: string): Promise<CardCheckList[]> {
    const cardCheckList = await this.cardCheckListRepository.findByCheckListId(
      check_list_id,
    );

    return cardCheckList;
  }
}

export default ListCheckListCardsService;
