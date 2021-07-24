import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierTransactionService from '@modules/transactions/services/CreateEventSupplierTransactionService';
import DeleteEventSupplierTransactionService from '@modules/transactions/services/DeleteEventSupplierTransactionService';
import ListEventSupplierTransactionsService from '@modules/transactions/services/ListEventSupplierTransactionsService';

export default class EventSupplierTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { agreement_id, transaction_id } = req.body;

    const createEventSupplierTransactionService = container.resolve(
      CreateEventSupplierTransactionService,
    );

    const supplierTransaction = await createEventSupplierTransactionService.execute(
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

    const deleteEventSupplierTransactionService = container.resolve(
      DeleteEventSupplierTransactionService,
    );

    await deleteEventSupplierTransactionService.execute(id);

    return res.status(200).send();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { agreement_id } = reqParams;

    const listEventSupplierTransactionsService = container.resolve(
      ListEventSupplierTransactionsService,
    );

    const supplierTransactions = await listEventSupplierTransactionsService.execute(
      agreement_id,
    );

    return res.json(classToClass(supplierTransactions));
  }
}
