import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventTaskNoteService from '@modules/events/services/CreateEventTaskNoteService';
import ListEventTaskNotesService from '@modules/events/services/ListEventTaskNotesService';
import DeleteEventTaskNoteService from '@modules/events/services/DeleteEventTaskNoteService';

export default class EventTaskNoteController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { task_id, note } = req.body;
    const createEventTaskNote = container.resolve(CreateEventTaskNoteService);

    const eventTaskNote = await createEventTaskNote.execute({
      task_id,
      user_id,
      note,
    });

    return res.json(eventTaskNote);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { task_id } = dataParams;

    const listEventTaskNote = container.resolve(ListEventTaskNotesService);

    const eventTaskNote = await listEventTaskNote.execute(task_id);

    return res.json(classToClass(eventTaskNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showEventTaskNote = container.resolve(DeleteEventTaskNoteService);

    await showEventTaskNote.execute(id);

    return res.status(200).send();
  }
}
