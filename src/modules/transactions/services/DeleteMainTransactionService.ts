import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMainTransactionsRepository from '../repositories/IMainTransactionsRepository';

@injectable()
class DeleteMainTransactionService {
  constructor(
    @inject('MainTransactionsRepository')
    private mainTransactionsRepository: IMainTransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const mainTransaction = await this.mainTransactionsRepository.findById(id);

    if (!mainTransaction) {
      throw new AppError('No card check list found.');
    }

    await this.mainTransactionsRepository.delete(mainTransaction);
  }
}

export default DeleteMainTransactionService;
