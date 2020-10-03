import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/finances/repositories/ITransactionsRepository';

@injectable()
class ListTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(agreement_id: string): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.findByAgreementId(
      agreement_id,
    );
    return transactions;
  }
}

export default ListTransactionService;
