import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '@modules/finances/dtos/ICreateTransactionDTO';
import ITransactionRepository from '@modules/finances/repositories/ITransactionsRepository';
import ITransactionAgreementsRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';

// Dependency Inversion (SOLID principles)
@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionRepository,

    @inject('TransactionAgreementsRepository')
    private transactionAgreementsRepository: ITransactionAgreementsRepository,
  ) {}

  public async execute({
    agreement_id,
    amount,
    due_date,
    isPaid,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const agreement = await this.transactionAgreementsRepository.findById(
      agreement_id,
    );

    if (!agreement) {
      throw new AppError('Event agreement not found.');
    }

    const findTransaction = await this.transactionsRepository.findByAgreementIdAndDueDate(
      agreement_id,
      due_date,
    );

    if (findTransaction) {
      throw new AppError('A transaction similar to that, already exists');
    }

    const appointment = await this.transactionsRepository.create({
      agreement_id,
      amount,
      due_date,
      isPaid,
    });

    return appointment;
  }
}

export default CreateTransactionService;
