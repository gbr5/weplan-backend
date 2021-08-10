import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventNoteAndTransactionNoteService from '@modules/notes/services/CreateEventNoteAndTransactionNoteService';

export default class CreateEventNoteAndTransactionNoteController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { transaction_id, note, event_id } = req.body;
    const author_id = req.user.id;

    const createTransactionNotes = container.resolve(
      CreateEventNoteAndTransactionNoteService,
    );

    const eventSupplierNote = await createTransactionNotes.execute({
      transaction_id,
      event_id,
      author_id,
      note,
    });

    return res.json(classToClass(eventSupplierNote));
  }
}
