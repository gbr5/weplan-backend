import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListOwnerCardsService from '@modules/suppliers/services/ListOwnerCardsService';

export default class ListOwnerCardsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_owner } = dataParams;
    const listStageCards = container.resolve(ListOwnerCardsService);

    const stageCard = await listStageCards.execute(card_owner);

    return res.json(classToClass(stageCard));
  }
}
