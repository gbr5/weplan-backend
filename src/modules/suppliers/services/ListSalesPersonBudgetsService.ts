import { injectable, inject } from 'tsyringe';

import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';

import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';

@injectable()
class ListSalesPersonBudgetsService {
  constructor(
    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,
  ) {}

  public async execute(
    sales_person_id: string,
    company_id: string,
  ): Promise<CardBudget[]> {
    const budgets = await this.cardBudgetsRepository.findBySalesPersonId(
      sales_person_id,
      company_id,
    );

    return budgets;
  }
}

export default ListSalesPersonBudgetsService;
