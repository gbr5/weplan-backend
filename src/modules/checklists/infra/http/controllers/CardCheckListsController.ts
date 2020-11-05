import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardCheckListService from '@modules/checklists/services/CreateCardCheckListService';
import ListCardCheckListsService from '@modules/checklists/services/ListCardCheckListsService';

export default class CardCheckListsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { card_unique_name, check_list_id, card_id } = req.body;

    const createCardCheckLists = container.resolve(CreateCardCheckListService);

    const checkListTask = await createCardCheckLists.execute({
      card_id,
      check_list_id,
      card_unique_name,
    });

    return res.json(classToClass(checkListTask));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { check_list_id } = reqParams;

    const listCardCheckLists = container.resolve(ListCardCheckListsService);

    const checkListTask = await listCardCheckLists.execute(check_list_id);

    return res.json(classToClass(checkListTask));
  }
}
