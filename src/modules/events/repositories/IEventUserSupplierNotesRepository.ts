import EventUserSupplierNote from '@modules/events/infra/typeorm/entities/EventUserSupplierNote';
import ICreateEventUserSupplierNoteDTO from '@modules/events/dtos/ICreateEventUserSupplierNoteDTO';

export default interface IEventUserSupplierNotesRepository {
  findById(id: string): Promise<EventUserSupplierNote | undefined>;
  findByEventSupplier(
    event_supplier_id: string,
  ): Promise<EventUserSupplierNote[]>;
  findByEventNote(event_note_id: string): Promise<EventUserSupplierNote[]>;
  create(data: ICreateEventUserSupplierNoteDTO): Promise<EventUserSupplierNote>;
  save(data: EventUserSupplierNote): Promise<EventUserSupplierNote>;
  delete(data: EventUserSupplierNote): Promise<void>;
}
