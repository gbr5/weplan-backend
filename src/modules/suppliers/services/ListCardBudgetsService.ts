import { injectable, inject } from 'tsyringe';

import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';

import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';

@injectable()
class ListCardBudgetsService {
  constructor(
    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,
  ) {}

  public async execute(card_unique_name: string): Promise<CardBudget[]> {
    const notes = await this.cardBudgetsRepository.findByCard(card_unique_name);

    return notes;
  }
}

export default ListCardBudgetsService;
