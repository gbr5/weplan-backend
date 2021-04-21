import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListCheckListCardsService from '@modules/checklists/services/ListCheckListCardsService';

export default class CardCheckListsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { check_list_id } = reqParams;

    const istCheckListCards = container.resolve(ListCheckListCardsService);

    const checkListTask = await istCheckListCards.execute(check_list_id);

    return res.json(classToClass(checkListTask));
  }
}
