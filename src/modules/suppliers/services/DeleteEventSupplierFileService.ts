import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierFilesRepository from '@modules/suppliers/repositories/IEventSupplierFilesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class DeleteEventSupplierFileService {
  constructor(
    @inject('EventSupplierFilesRepository')
    private eventSupplierFilesRepository: IEventSupplierFilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventSupplierFile = await this.eventSupplierFilesRepository.findById(
      id,
    );
    if (!eventSupplierFile) throw new AppError('EventSupplier not found!');
    await this.storageProvider.deleteFile(eventSupplierFile.file_name);

    if (!eventSupplierFile) {
      throw new AppError('No confirmation found.');
    }

    await this.eventSupplierFilesRepository.delete(eventSupplierFile);
  }
}

export default DeleteEventSupplierFileService;
