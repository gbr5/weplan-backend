import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITransactionFilesRepository from '@modules/transactions/repositories/ITransactionFilesRepository';
import TransactionFile from '@modules/transactions/infra/typeorm/entities/TransactionFile';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  name: string;
  id: string;
}

@injectable()
class UpdateTransactionFileService {
  constructor(
    @inject('TransactionFilesRepository')
    private transactionFilesRepository: ITransactionFilesRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ name, id }: IRequest): Promise<TransactionFile> {
    const transactionFile = await this.transactionFilesRepository.findById(id);

    if (!transactionFile) {
      throw new AppError('Transaction file not found!');
    }

    transactionFile.name = name;

    const file = await this.transactionFilesRepository.save(transactionFile);

    return file;
  }
}

export default UpdateTransactionFileService;
