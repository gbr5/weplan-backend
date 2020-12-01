import { injectable, inject } from 'tsyringe';

import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';

import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';

@injectable()
class ListCustomerBudgetsService {
  constructor(
    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,
  ) {}

  public async execute(customer_id: string): Promise<CardBudget[]> {
    const budgets = await this.cardBudgetsRepository.findByCustomerId(
      customer_id,
    );

    return budgets;
  }
}

export default ListCustomerBudgetsService;
