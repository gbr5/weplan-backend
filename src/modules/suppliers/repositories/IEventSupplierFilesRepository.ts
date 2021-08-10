import EventSupplierFile from '@modules/suppliers/infra/typeorm/entities/EventSupplierFile';
import ICreateEventSupplierFileDTO from '../dtos/ICreateEventSupplierFileDTO';

export default interface IEventSupplierFilesRepository {
  create(data: ICreateEventSupplierFileDTO): Promise<EventSupplierFile>;
  findByEventSupplierId(supplier_id: string): Promise<EventSupplierFile[]>;
  findById(id: string): Promise<EventSupplierFile | undefined>;
  save(data: EventSupplierFile): Promise<EventSupplierFile>;
  delete(data: EventSupplierFile): Promise<void>;
}
