import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerNoteService from '@modules/notes/services/CreateEventOwnerNoteService';
import ListEventOwnerNotesService from '@modules/notes/services/ListEventOwnerNotesService';
import DeleteEventOwnerNoteService from '@modules/notes/services/DeleteEventOwnerNoteService';

export default class EventOwnerNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { owner_id, note } = req.body;
    const author_id = req.user.id;

    const createEventOwnerNotes = container.resolve(
      CreateEventOwnerNoteService,
    );

    const eventOwnerNote = await createEventOwnerNotes.execute({
      owner_id,
      author_id,
      note,
    });

    return res.json(classToClass(eventOwnerNote));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { owner_id } = reqParams;

    const listEventOwnerNotes = container.resolve(ListEventOwnerNotesService);

    const eventOwnerNote = await listEventOwnerNotes.execute(owner_id);

    return res.json(classToClass(eventOwnerNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventOwnerNoteService = container.resolve(
      DeleteEventOwnerNoteService,
    );

    await deleteEventOwnerNoteService.execute(id);

    return res.status(200).send();
  }
}
