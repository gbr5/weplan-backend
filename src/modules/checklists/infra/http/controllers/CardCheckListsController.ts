import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardCheckListService from '@modules/checklists/services/CreateCardCheckListService';
import ListCardCheckListsService from '@modules/checklists/services/ListCardCheckListsService';
import ListCheckListCardsService from '@modules/checklists/services/ListCheckListCardsService';
import DeleteCardCheckListService from '@modules/checklists/services/DeleteCardCheckListService';

export default class CardCheckListsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { card_unique_name, check_list_id } = req.body;

    const createCardCheckLists = container.resolve(CreateCardCheckListService);

    const checkListTask = await createCardCheckLists.execute({
      check_list_id,
      card_unique_name,
    });

    return res.json(classToClass(checkListTask));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { card_unique_name } = reqParams;

    const listCardCheckLists = container.resolve(ListCardCheckListsService);

    const checkListTask = await listCardCheckLists.execute(card_unique_name);

    return res.json(classToClass(checkListTask));
  }

  public async listCards(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { check_list_id } = reqParams;

    const istCheckListCards = container.resolve(ListCheckListCardsService);

    const checkListTask = await istCheckListCards.execute(check_list_id);

    return res.json(classToClass(checkListTask));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCardCheckLists = container.resolve(DeleteCardCheckListService);

    await deleteCardCheckLists.execute(id);

    return res.status(200).send();
  }
}
