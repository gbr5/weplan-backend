import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITransactionFilesRepository from '@modules/transactions/repositories/ITransactionFilesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class DeleteTransactionFileService {
  constructor(
    @inject('TransactionFilesRepository')
    private transactionFilesRepository: ITransactionFilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const transactionFile = await this.transactionFilesRepository.findById(id);
    if (!transactionFile) throw new AppError('Transaction not found!');
    await this.storageProvider.deleteFile(transactionFile.file_name);

    if (!transactionFile) {
      throw new AppError('No confirmation found.');
    }

    await this.transactionFilesRepository.delete(transactionFile);
  }
}

export default DeleteTransactionFileService;
