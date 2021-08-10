import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITransactionFilesRepository from '@modules/transactions/repositories/ITransactionFilesRepository';
import TransactionFile from '@modules/transactions/infra/typeorm/entities/TransactionFile';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

interface IRequest {
  name: string;
  transaction_id: string;
}

@injectable()
class CreateTransactionFileService {
  constructor(
    @inject('TransactionFilesRepository')
    private transactionFilesRepository: ITransactionFilesRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    transaction_id,
  }: IRequest): Promise<TransactionFile> {
    const transactionExists = await this.transactionsRepository.findById(
      transaction_id,
    );

    if (!transactionExists) {
      throw new AppError('Transaction not found!');
    }

    const tryName = name.replace(/^[^-\r\n]+-/, '').replace(/\s/g, '_');
    await this.storageProvider.saveFile(name);

    const file = await this.transactionFilesRepository.create({
      transaction_id,
      name: tryName,
      file_name: name,
    });

    return file;
  }
}

export default CreateTransactionFileService;
