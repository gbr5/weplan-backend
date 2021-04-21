import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCheckListService from '@modules/checklists/services/CreateCheckListService';
import UpdateCheckListsService from '@modules/checklists/services/UpdateCheckListService';
import ListCheckListsService from '@modules/checklists/services/ListCheckListsService';
import ShowCheckListService from '@modules/checklists/services/ShowCheckListService';

export default class CheckListsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, name, color, isActive, priority, due_date } = req.body;

    const createCheckLists = container.resolve(CreateCheckListService);

    const checkList = await createCheckLists.execute({
      color,
      user_id,
      name,
      isActive,
      priority,
      due_date,
    });

    return res.json(classToClass(checkList));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const listCheckLists = container.resolve(ListCheckListsService);

    const checkList = await listCheckLists.execute(user_id);

    return res.json(classToClass(checkList));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const showCheckList = container.resolve(ShowCheckListService);

    const checkList = await showCheckList.execute(id);

    return res.json(classToClass(checkList));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const { name, color, isActive, priority, due_date } = req.body;

    const updateCheckLists = container.resolve(UpdateCheckListsService);

    const checkList = await updateCheckLists.execute({
      id,
      name,
      color,
      isActive,
      priority,
      due_date,
    });

    return res.json(classToClass(checkList));
  }
}
