import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListInactiveComercialCardsService from '@modules/suppliers/services/ListInactiveComercialCardsService';

export default class ListInactiveComercialCardsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { funnel_id } = dataParams;

    const listComercialCards = container.resolve(
      ListInactiveComercialCardsService,
    );

    const inactiveComercialCards = await listComercialCards.execute(funnel_id);

    return res.json(classToClass(inactiveComercialCards));
  }
}
