import { injectable, inject } from 'tsyringe';

import TransactionFile from '@modules/transactions/infra/typeorm/entities/TransactionFile';
import ITransactionFilesRepository from '@modules/transactions/repositories/ITransactionFilesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListTransactionFilesService {
  constructor(
    @inject('TransactionFilesRepository')
    private transactionsRepository: ITransactionFilesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(transaction_id: string): Promise<TransactionFile[]> {
    const transactionFiles = await this.transactionsRepository.findByTransactionId(
      transaction_id,
    );

    return transactionFiles;
  }
}

export default ListTransactionFilesService;
