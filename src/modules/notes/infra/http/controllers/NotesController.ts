import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateNoteService from '@modules/notes/services/UpdateNoteService';

export default class NotesController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, note } = req.body;

    const createNotes = container.resolve(UpdateNoteService);

    const checkListTask = await createNotes.execute({
      id,
      note,
    });

    return res.json(classToClass(checkListTask));
  }
}
