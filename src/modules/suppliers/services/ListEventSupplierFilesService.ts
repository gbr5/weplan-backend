import { injectable, inject } from 'tsyringe';

import EventSupplierFile from '@modules/suppliers/infra/typeorm/entities/EventSupplierFile';
import IEventSupplierFilesRepository from '@modules/suppliers/repositories/IEventSupplierFilesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventSupplierFilesService {
  constructor(
    @inject('EventSupplierFilesRepository')
    private eventSupplierFilesRepository: IEventSupplierFilesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(supplier_id: string): Promise<EventSupplierFile[]> {
    const supplierFiles = await this.eventSupplierFilesRepository.findByEventSupplierId(
      supplier_id,
    );

    return supplierFiles;
  }
}

export default ListEventSupplierFilesService;
