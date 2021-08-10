import { getRepository, Repository } from 'typeorm';

import IEventSupplierFilesRepository from '@modules/suppliers/repositories/IEventSupplierFilesRepository';

import EventSupplierFile from '@modules/suppliers/infra/typeorm/entities/EventSupplierFile';
import ICreateEventSupplierFileDTO from '@modules/suppliers/dtos/ICreateEventSupplierFileDTO';

class EventSupplierFilesRepository implements IEventSupplierFilesRepository {
  private ormRepository: Repository<EventSupplierFile>;

  constructor() {
    this.ormRepository = getRepository(EventSupplierFile);
  }

  public async findById(id: string): Promise<EventSupplierFile | undefined> {
    const findEventSupplierFile = await this.ormRepository.findOne(id);

    return findEventSupplierFile;
  }

  public async findByEventSupplierId(
    supplier_id: string,
  ): Promise<EventSupplierFile[]> {
    const findEventSupplierFiles = await this.ormRepository.find({
      where: { supplier_id },
    });

    return findEventSupplierFiles;
  }

  public async create(
    data: ICreateEventSupplierFileDTO,
  ): Promise<EventSupplierFile> {
    const supplier = this.ormRepository.create(data);

    await this.ormRepository.save(supplier);

    return supplier;
  }

  public async save(data: EventSupplierFile): Promise<EventSupplierFile> {
    return this.ormRepository.save(data);
  }

  public async delete(data: EventSupplierFile): Promise<void> {
    await this.ormRepository.delete(data.id);
  }
}

export default EventSupplierFilesRepository;
