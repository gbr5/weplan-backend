import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardBudgetInstallmentsRepository from '@modules/suppliers/repositories/ICardBudgetInstallmentsRepository';

@injectable()
class DeleteCardBudgetInstallmentService {
  constructor(
    @inject('CardBudgetInstallmentsRepository')
    private cardBudgetInstallmentsRepository: ICardBudgetInstallmentsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardBudgetInstallment = await this.cardBudgetInstallmentsRepository.findById(
      id,
    );

    if (!cardBudgetInstallment) {
      throw new AppError('Card budget installment not found.');
    }

    await this.cardBudgetInstallmentsRepository.delete(cardBudgetInstallment);
  }
}

export default DeleteCardBudgetInstallmentService;
