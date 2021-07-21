import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListPayerTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(payer_id: string): Promise<Transaction[]> {
    const transaction = await this.transactionsRepository.findByPayerId(
      payer_id,
    );

    return transaction;
  }
}

export default ListPayerTransactionsService;
