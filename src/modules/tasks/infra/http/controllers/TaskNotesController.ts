import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTaskNoteService from '@modules/tasks/services/CreateTaskNoteService';
import ListTaskNotesService from '@modules/tasks/services/ListTaskNotesService';
import DeleteTaskNoteService from '@modules/tasks/services/DeleteTaskNoteService';

export default class TaskNoteController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { task_id, note } = req.body;
    const createTaskNote = container.resolve(CreateTaskNoteService);

    const taskNote = await createTaskNote.execute({
      task_id,
      user_id,
      note,
    });

    return res.json(taskNote);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { task_id } = dataParams;

    const listTaskNote = container.resolve(ListTaskNotesService);

    const taskNote = await listTaskNote.execute(task_id);

    return res.json(classToClass(taskNote));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const showTaskNote = container.resolve(DeleteTaskNoteService);

    await showTaskNote.execute(id);

    return res.status(200).send();
  }
}
