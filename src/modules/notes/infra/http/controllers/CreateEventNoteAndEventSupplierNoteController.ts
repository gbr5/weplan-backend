import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventNoteAndEventSupplierNoteService from '@modules/notes/services/CreateEventNoteAndEventSupplierNoteService';

export default class CreateEventNoteAndEventSupplierNoteController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { supplier_id, note } = req.body;
    const author_id = req.user.id;

    const createEventSupplierNotes = container.resolve(
      CreateEventNoteAndEventSupplierNoteService,
    );

    const eventSupplierNote = await createEventSupplierNotes.execute({
      supplier_id,
      author_id,
      note,
    });

    return res.json(classToClass(eventSupplierNote));
  }
}
