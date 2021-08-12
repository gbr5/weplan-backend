import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<Transaction[]> {
    const payerTransactions = await this.transactionsRepository.findByPayerId(
      user_id,
    );
    const payeeTransactions = await this.transactionsRepository.findByPayeeId(
      user_id,
    );
    const response: Transaction[] = [];
    payerTransactions.map(transaction => response.push(transaction));
    payeeTransactions.map(transaction => response.push(transaction));
    // payeeTransactions.map(transaction => {
    //   const findTransaction = response.find(item => item.id === transaction.id);
    //   if (!findTransaction) {
    //     response.push(transaction);
    //   }
    //   return transaction;
    // });
    return response;
  }
}

export default ListUserTransactionsService;
