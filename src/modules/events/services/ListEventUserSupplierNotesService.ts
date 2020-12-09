import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventUserSupplierNotesRepository from '@modules/events/repositories/IEventUserSupplierNotesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventUserSupplierNoteDTO from '../dtos/ICreateEventUserSupplierNoteDTO';

@injectable()
class ListEventUserSupplierNotesService {
  constructor(
    @inject('EventUserSupplierNotesRepository')
    private eventUserSupplierNotesRepository: IEventUserSupplierNotesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(
    event_supplier_id: string,
  ): Promise<IEventUserSupplierNoteDTO[]> {
    const eventUserSupplierNotes = await this.eventUserSupplierNotesRepository.findByEventSupplier(
      event_supplier_id,
    );

    return eventUserSupplierNotes;
  }
}

export default ListEventUserSupplierNotesService;
