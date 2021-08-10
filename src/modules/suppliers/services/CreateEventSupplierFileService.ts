import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSupplierFilesRepository from '@modules/suppliers/repositories/IEventSupplierFilesRepository';
import EventSupplierFile from '@modules/suppliers/infra/typeorm/entities/EventSupplierFile';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';

interface IRequest {
  name: string;
  supplier_id: string;
}

@injectable()
class CreateEventSupplierFileService {
  constructor(
    @inject('EventSupplierFilesRepository')
    private eventSupplierFilesRepository: IEventSupplierFilesRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSuppliersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    supplier_id,
  }: IRequest): Promise<EventSupplierFile> {
    const eventSupplierExists = await this.eventSuppliersRepository.findById(
      supplier_id,
    );

    if (!eventSupplierExists) {
      throw new AppError('EventSupplier not found!');
    }

    const tryName = name.replace(/^[^-\r\n]+-/, '').replace(/\s/g, '_');
    await this.storageProvider.saveFile(name);

    const file = await this.eventSupplierFilesRepository.create({
      supplier_id,
      name: tryName,
      file_name: name,
    });

    return file;
  }
}

export default CreateEventSupplierFileService;
