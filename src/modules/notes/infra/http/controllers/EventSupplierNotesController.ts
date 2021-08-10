import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierNoteService from '@modules/notes/services/CreateEventSupplierNoteService';
import ListEventSupplierNotesService from '@modules/notes/services/ListEventSupplierNotesService';
import DeleteEventSupplierNoteService from '@modules/notes/services/DeleteEventSupplierNoteService';

export default class EventSupplierNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { supplier_id, note } = req.body;
    const author_id = req.user.id;

    const createEventSupplierNotes = container.resolve(
      CreateEventSupplierNoteService,
    );

    const eventSupplierNote = await createEventSupplierNotes.execute({
      supplier_id,
      author_id,
      note,
    });

    return res.json(classToClass(eventSupplierNote));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { supplier_id } = reqParams;

    const listEventSupplierNotes = container.resolve(
      ListEventSupplierNotesService,
    );

    const eventSupplierNote = await listEventSupplierNotes.execute(supplier_id);

    return res.json(classToClass(eventSupplierNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventSupplierNoteService = container.resolve(
      DeleteEventSupplierNoteService,
    );

    await deleteEventSupplierNoteService.execute(id);

    return res.status(200).send();
  }
}
