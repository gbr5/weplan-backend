import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierNoteAndTransactionNoteService from '@modules/notes/services/CreateEventSupplierNoteAndTransactionNoteService';

export default class CreateEventSupplierNoteAndTransactionNoteController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { transaction_id, supplier_id, note } = req.body;
    const author_id = req.user.id;

    const createTransactionNotes = container.resolve(
      CreateEventSupplierNoteAndTransactionNoteService,
    );

    const eventSupplierNote = await createTransactionNotes.execute({
      transaction_id,
      supplier_id,
      author_id,
      note,
    });

    return res.json(classToClass(eventSupplierNote));
  }
}
