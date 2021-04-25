import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CardCheckList from '@modules/checklists/infra/typeorm/entities/CardCheckList';
import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';

@injectable()
class ListCardCheckListsService {
  constructor(
    @inject('CardCheckListsRepository')
    private cardCheckListRepository: ICardCheckListsRepository,
  ) {}

  public async execute(card_unique_name: string): Promise<CardCheckList[]> {
    const cardCheckList = await this.cardCheckListRepository.findByCardUniqueName(
      card_unique_name,
    );

    return cardCheckList.filter(card => card.check_list.isActive);
  }
}

export default ListCardCheckListsService;
