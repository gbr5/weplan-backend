import { injectable, inject } from 'tsyringe';

import ICardBudgetInstallmentsRepository from '@modules/suppliers/repositories/ICardBudgetInstallmentsRepository';

import CardBudgetInstallment from '@modules/suppliers/infra/typeorm/entities/CardBudgetInstallment';

@injectable()
class ListCardBudgetInstallmentsService {
  constructor(
    @inject('CardBudgetInstallmentsRepository')
    private cardBudgetInstallmentsRepository: ICardBudgetInstallmentsRepository,
  ) {}

  public async execute(
    card_budget_id: string,
  ): Promise<CardBudgetInstallment[]> {
    const notes = await this.cardBudgetInstallmentsRepository.findByCardBudget(
      card_budget_id,
    );

    return notes;
  }
}

export default ListCardBudgetInstallmentsService;
