import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierFilesRepository from '@modules/suppliers/repositories/IEventSupplierFilesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class DeleteEventSupplierFileService {
  constructor(
    @inject('EventSupplierFilesRepository')
    private transactionFilesRepository: IEventSupplierFilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const transactionFile = await this.transactionFilesRepository.findById(id);
    if (!transactionFile) throw new AppError('EventSupplier not found!');
    await this.storageProvider.deleteFile(transactionFile.file_name);

    if (!transactionFile) {
      throw new AppError('No confirmation found.');
    }

    await this.transactionFilesRepository.delete(transactionFile);
  }
}

export default DeleteEventSupplierFileService;
