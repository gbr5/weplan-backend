import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPayeeTransactionsService from '@modules/transactions/services/ListPayeeTransactionsService';

export default class ListPayeeTransactionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { payee_id } = reqParams;

    const listPayeeTransactionsService = container.resolve(
      ListPayeeTransactionsService,
    );

    const transaction = await listPayeeTransactionsService.execute(payee_id);

    return res.json(classToClass(transaction));
  }
}
