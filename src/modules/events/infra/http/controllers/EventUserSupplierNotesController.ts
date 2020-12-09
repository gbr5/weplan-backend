import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventUserSupplierNoteService from '@modules/events/services/CreateEventUserSupplierNoteService';
import ListEventUserSupplierNotesService from '@modules/events/services/ListEventUserSupplierNotesService';
import DeleteEventUserSupplierNoteService from '@modules/events/services/DeleteEventUserSupplierNoteService';

export default class EventUserSupplierNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_note_id, event_supplier_id } = req.body;
    const createEventUserSupplierNote = container.resolve(
      CreateEventUserSupplierNoteService,
    );
    const eventUserSupplierNote = await createEventUserSupplierNote.execute({
      event_note_id,
      event_supplier_id,
    });
    return res.json(classToClass(eventUserSupplierNote));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_supplier_id } = dataParams;
    const listEventUserSupplierNote = container.resolve(
      ListEventUserSupplierNotesService,
    );
    const eventUserSupplierNote = await listEventUserSupplierNote.execute(
      event_supplier_id,
    );
    return res.json(classToClass(eventUserSupplierNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteEventUserSupplierNote = container.resolve(
      DeleteEventUserSupplierNoteService,
    );
    await deleteEventUserSupplierNote.execute(id);
    return res.status(200).send();
  }
}
