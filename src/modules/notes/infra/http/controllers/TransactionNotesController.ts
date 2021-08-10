import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTransactionNoteService from '@modules/notes/services/CreateTransactionNoteService';
import ListTransactionNotesService from '@modules/notes/services/ListTransactionNotesService';
import DeleteTransactionNoteService from '@modules/notes/services/DeleteTransactionNoteService';

export default class TransactionNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { transaction_id, note } = req.body;
    const author_id = req.user.id;

    const createTransactionNotes = container.resolve(
      CreateTransactionNoteService,
    );

    const transactionNote = await createTransactionNotes.execute({
      transaction_id,
      author_id,
      note,
    });

    return res.json(classToClass(transactionNote));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { transaction_id } = reqParams;

    const listTransactionNotes = container.resolve(ListTransactionNotesService);

    const transactionNote = await listTransactionNotes.execute(transaction_id);

    return res.json(classToClass(transactionNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteTransactionNoteService = container.resolve(
      DeleteTransactionNoteService,
    );

    await deleteTransactionNoteService.execute(id);

    return res.status(200).send();
  }
}
