import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventSupplierNote from '@modules/notes/infra/typeorm/entities/EventSupplierNote';
import IEventSupplierNotesRepository from '@modules/notes/repositories/IEventSupplierNotesRepository';

@injectable()
class ListEventSupplierNotesService {
  constructor(
    @inject('EventSupplierNotesRepository')
    private eventSupplierNotesRepository: IEventSupplierNotesRepository,
  ) {}

  public async execute(supplier_id: string): Promise<EventSupplierNote[]> {
    const supplierNotes = await this.eventSupplierNotesRepository.findBySupplierId(
      supplier_id,
    );

    return supplierNotes;
  }
}

export default ListEventSupplierNotesService;
