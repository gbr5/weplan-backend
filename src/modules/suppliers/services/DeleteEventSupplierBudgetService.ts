import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierBudgetsRepository from '@modules/suppliers/repositories/IEventSupplierBudgetsRepository';

@injectable()
class DeleteEventSupplierBudgetService {
  constructor(
    @inject('EventSupplierBudgetsRepository')
    private eventSupplierBudgetsRepository: IEventSupplierBudgetsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventSupplierBudget = await this.eventSupplierBudgetsRepository.findById(
      id,
    );

    if (!eventSupplierBudget)
      throw new AppError('EventSupplier budget not found!');

    await this.eventSupplierBudgetsRepository.delete(eventSupplierBudget);
  }
}

export default DeleteEventSupplierBudgetService;
