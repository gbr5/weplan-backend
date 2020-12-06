import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IBudgetFilesRepository from '@modules/users/repositories/IBudgetFilesRepository';
import BudgetFile from '../infra/typeorm/entities/BudgetFile';

@injectable()
class ListBudgetFileService {
  constructor(
    @inject('BudgetFilesRepository')
    private budgetFilesRepository: IBudgetFilesRepository,
  ) {}

  public async execute(budget_id: string): Promise<BudgetFile[]> {
    const budgetFiles = this.budgetFilesRepository.findByBudgetId(budget_id);

    return budgetFiles;
  }
}

export default ListBudgetFileService;
