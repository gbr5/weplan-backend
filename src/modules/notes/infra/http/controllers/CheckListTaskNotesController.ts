import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCheckListTaskNoteService from '@modules/notes/services/CreateCheckListTaskNoteService';
import ListCheckListTaskNotesService from '@modules/notes/services/ListCheckListTaskNotesService';
import DeleteCheckListTaskNoteService from '@modules/notes/services/DeleteCheckListTaskNoteService';

export default class CheckListTaskNotesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { task_id, note } = req.body;

    const createCheckListTaskNotes = container.resolve(
      CreateCheckListTaskNoteService,
    );

    const checkListTask = await createCheckListTaskNotes.execute({
      task_id,
      note,
    });

    return res.json(classToClass(checkListTask));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const listCheckListTaskNotes = container.resolve(
      ListCheckListTaskNotesService,
    );

    const checkListTask = await listCheckListTaskNotes.execute(id);

    return res.json(classToClass(checkListTask));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCheckListTaskNoteService = container.resolve(
      DeleteCheckListTaskNoteService,
    );

    await deleteCheckListTaskNoteService.execute(id);

    return res.status(200).send();
  }
}
