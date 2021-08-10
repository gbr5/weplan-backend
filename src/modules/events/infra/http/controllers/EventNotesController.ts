import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventNoteService from '@modules/events/services/CreateEventNoteService';
import ListEventNotesService from '@modules/events/services/ListEventNotesService';
import DeleteEventNoteService from '@modules/events/services/DeleteEventNoteService';

export default class EventNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { event_id, note } = req.body;
    const author_id = req.user.id;

    const createEventNote = container.resolve(CreateEventNoteService);

    const eventNote = await createEventNote.execute({
      event_id,
      note,
      author_id,
    });

    return res.json(classToClass(eventNote));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { event_id } = dataParams;

    const listEventNote = container.resolve(ListEventNotesService);

    const eventNote = await listEventNote.execute(event_id);

    return res.json(classToClass(eventNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventNote = container.resolve(DeleteEventNoteService);

    await deleteEventNote.execute(id);

    return res.status(200).send();
  }
}
