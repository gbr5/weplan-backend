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

  public async execute(card_id: string): Promise<CardCheckList[]> {
    const cardCheckList = await this.cardCheckListRepository.findByCardId(
      card_id,
    );

    return cardCheckList;
  }
}

export default ListCardCheckListsService;
