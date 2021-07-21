import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListPayerTransactionsService from '@modules/transactions/services/ListPayerTransactionsService';

export default class ListPayerTransactionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { payer_id } = reqParams;

    const listPayerTransactionsService = container.resolve(
      ListPayerTransactionsService,
    );

    const transaction = await listPayerTransactionsService.execute(payer_id);

    return res.json(classToClass(transaction));
  }
}
