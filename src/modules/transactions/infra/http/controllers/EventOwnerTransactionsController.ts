import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerTransactionService from '@modules/transactions/services/CreateEventOwnerTransactionService';
import DeleteEventOwnerTransactionService from '@modules/transactions/services/DeleteEventOwnerTransactionService';
import ListEventOwnerTransactionsService from '@modules/transactions/services/ListEventOwnerTransactionsService';

export default class EventOwnerTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { agreement_id, transaction_id } = req.body;
    console.log({ agreement_id, transaction_id });
    const createEventOwnerTransactionService = container.resolve(
      CreateEventOwnerTransactionService,
    );

    const supplierTransaction = await createEventOwnerTransactionService.execute(
      {
        agreement_id,
        transaction_id,
      },
    );

    return res.json(classToClass(supplierTransaction));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventOwnerTransactionService = container.resolve(
      DeleteEventOwnerTransactionService,
    );

    await deleteEventOwnerTransactionService.execute(id);

    return res.status(200).send();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { agreement_id } = reqParams;

    const listEventOwnerTransactionsService = container.resolve(
      ListEventOwnerTransactionsService,
    );

    const supplierTransactions = await listEventOwnerTransactionsService.execute(
      agreement_id,
    );

    return res.json(classToClass(supplierTransactions));
  }
}
