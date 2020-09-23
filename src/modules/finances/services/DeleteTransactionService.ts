import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITransactionRepository from '@modules/finances/repositories/ITransactionsRepository';

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findTransaction = await this.transactionsRepository.findById(id);

    if (!findTransaction) {
      throw new AppError('Agreement not found.');
    }

    await this.transactionsRepository.delete(findTransaction);
  }
}

export default DeleteTransactionService;
