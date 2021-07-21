import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListPayeeTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(payee_id: string): Promise<Transaction[]> {
    const transaction = await this.transactionsRepository.findByPayeeId(
      payee_id,
    );

    return transaction;
  }
}

export default ListPayeeTransactionsService;
