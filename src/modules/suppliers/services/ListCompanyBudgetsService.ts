import { injectable, inject } from 'tsyringe';

import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';

import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';

@injectable()
class ListCompanyBudgetsService {
  constructor(
    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,
  ) {}

  public async execute(company_id: string): Promise<CardBudget[]> {
    const budgets = await this.cardBudgetsRepository.findByCompanyId(
      company_id,
    );

    return budgets;
  }
}

export default ListCompanyBudgetsService;
