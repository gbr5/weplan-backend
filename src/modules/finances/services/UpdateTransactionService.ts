import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITransactionRepository from '@modules/finances/repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

@injectable()
class UpdateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionRepository,
  ) {}

  public async execute(
    id: string,
    amount: number,
    due_date: Date,
    isPaid: boolean,
  ): Promise<Transaction> {
    const findTransaction = await this.transactionsRepository.findById(id);

    if (!findTransaction) {
      throw new AppError('Transaction Agreement  not found.');
    }

    findTransaction.amount = amount;
    findTransaction.due_date = due_date;
    findTransaction.isPaid = isPaid;

    const updatedTransaction = await this.transactionsRepository.save(
      findTransaction,
    );

    return updatedTransaction;
  }
}

export default UpdateTransactionService;
