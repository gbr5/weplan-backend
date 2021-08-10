import EventSupplierNote from '@modules/notes/infra/typeorm/entities/EventSupplierNote';
import ICreateEventSupplierNoteDTO from '@modules/notes/dtos/ICreateEventSupplierNoteDTO';

export default interface IEventSupplierNotesRepository {
  create(data: ICreateEventSupplierNoteDTO): Promise<EventSupplierNote>;
  findById(id: string): Promise<EventSupplierNote | undefined>;
  findBySupplierId(supplier_id: string): Promise<EventSupplierNote[]>;
  save(eventSupplierNote: EventSupplierNote): Promise<EventSupplierNote>;
  delete(eventSupplierNote: EventSupplierNote): Promise<void>;
}
