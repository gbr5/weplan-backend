import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListEventTransactionsService from '@modules/transactions/services/ListEventTransactionsService';

export default class ListEventTransactionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;

    const listEventTransactionsService = container.resolve(
      ListEventTransactionsService,
    );

    const transaction = await listEventTransactionsService.execute(event_id);

    return res.json(classToClass(transaction));
  }
}
