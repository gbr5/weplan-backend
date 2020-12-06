import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBudgetFilesRepository from '@modules/users/repositories/IBudgetFilesRepository';

@injectable()
class DeleteBudgetFileService {
  constructor(
    @inject('BudgetFilesRepository')
    private budgetFilesRepository: IBudgetFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const budgetFile = await this.budgetFilesRepository.findById(id);

    if (!budgetFile) {
      throw new AppError('No confirmation found.');
    }

    await this.budgetFilesRepository.delete(budgetFile);
  }
}

export default DeleteBudgetFileService;
