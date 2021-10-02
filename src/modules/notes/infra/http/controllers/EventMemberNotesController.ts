import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventMemberNoteService from '@modules/notes/services/CreateEventMemberNoteService';
import ListEventMemberNotesService from '@modules/notes/services/ListEventMemberNotesService';
import DeleteEventMemberNoteService from '@modules/notes/services/DeleteEventMemberNoteService';

export default class EventMemberNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { member_id, note } = req.body;
    const author_id = req.user.id;

    const createEventMemberNotes = container.resolve(
      CreateEventMemberNoteService,
    );

    const eventMemberNote = await createEventMemberNotes.execute({
      member_id,
      author_id,
      note,
    });

    return res.json(classToClass(eventMemberNote));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { member_id } = reqParams;

    const listEventMemberNotes = container.resolve(ListEventMemberNotesService);

    const eventMemberNote = await listEventMemberNotes.execute(member_id);

    return res.json(classToClass(eventMemberNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventMemberNoteService = container.resolve(
      DeleteEventMemberNoteService,
    );

    await deleteEventMemberNoteService.execute(id);

    return res.status(200).send();
  }
}
