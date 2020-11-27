import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardNoteService from '@modules/suppliers/services/CreateCardNoteService';
import ListCardNotesService from '@modules/suppliers/services/ListCardNotesService';
import DeleteCardNoteService from '@modules/suppliers/services/DeleteCardNoteService';
import UpdateCardNoteService from '@modules/suppliers/services/UpdateCardNoteService';

export default class CardNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, card_unique_name, note } = req.body;

    const createCardNotes = container.resolve(CreateCardNoteService);

    const card = await createCardNotes.execute({
      user_id,
      card_unique_name,
      note,
    });

    return res.json(classToClass(card));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_unique_name } = dataParams;

    const listCardNotes = container.resolve(ListCardNotesService);

    const cards = await listCardNotes.execute(card_unique_name);

    return res.json(classToClass(cards));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const { note } = req.body;

    const cardNote = container.resolve(UpdateCardNoteService);

    await cardNote.execute(id, note);

    return res.json(classToClass(cardNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCardNote = container.resolve(DeleteCardNoteService);

    await deleteCardNote.execute(id);

    return res.status(200).send();
  }
}
