import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventMemberTransactionService from '@modules/transactions/services/CreateEventMemberTransactionService';
import DeleteEventMemberTransactionService from '@modules/transactions/services/DeleteEventMemberTransactionService';
import ListEventMemberTransactionsService from '@modules/transactions/services/ListEventMemberTransactionsService';

export default class EventMemberTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { agreement_id, transaction_id } = req.body;
    const createEventMemberTransactionService = container.resolve(
      CreateEventMemberTransactionService,
    );

    const supplierTransaction = await createEventMemberTransactionService.execute(
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

    const deleteEventMemberTransactionService = container.resolve(
      DeleteEventMemberTransactionService,
    );

    await deleteEventMemberTransactionService.execute(id);

    return res.status(200).send();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { agreement_id } = reqParams;

    const listEventMemberTransactionsService = container.resolve(
      ListEventMemberTransactionsService,
    );

    const supplierTransactions = await listEventMemberTransactionsService.execute(
      agreement_id,
    );

    return res.json(classToClass(supplierTransactions));
  }
}
