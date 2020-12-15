import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserTransactionsRepository from '../repositories/IUserTransactionsRepository';

@injectable()
class DeleteUserTransactionService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userTransaction = await this.userTransactionsRepository.findById(id);

    if (!userTransaction) {
      throw new AppError('No card check list found.');
    }

    await this.userTransactionsRepository.delete(userTransaction);
  }
}

export default DeleteUserTransactionService;
