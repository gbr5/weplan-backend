import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserTransactionsService from '@modules/transactions/services/ListUserTransactionsService';

export default class ListUserTransactionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const listUserTransactionsService = container.resolve(
      ListUserTransactionsService,
    );

    const transaction = await listUserTransactionsService.execute(user_id);

    return res.json(classToClass(transaction));
  }
}
