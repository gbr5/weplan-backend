import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierMainTransactionService from '@modules/transactions/services/CreateEventSupplierMainTransactionService';
import UpdateEventSupplierMainTransactionsService from '@modules/transactions/services/UpdateEventSupplierMainTransactionService';
import DeleteEventSupplierMainTransactionService from '@modules/transactions/services/DeleteEventSupplierMainTransactionService';
import ListEventSupplierMainTransactionsService from '@modules/transactions/services/ListEventSupplierMainTransactionsService';

export default class EventSupplierMainTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      main_transaction_id,
      agreement_transaction_id,
      transaction_type,
    } = req.body;

    const createEventSupplierMainTransactions = container.resolve(
      CreateEventSupplierMainTransactionService,
    );

    const checkList = await createEventSupplierMainTransactions.execute({
      main_transaction_id,
      agreement_transaction_id,
      transaction_type,
    });

    return res.json(classToClass(checkList));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const { transaction_type } = req.body;

    const updateEventSupplierMainTransactions = container.resolve(
      UpdateEventSupplierMainTransactionsService,
    );

    const checkList = await updateEventSupplierMainTransactions.execute({
      id,
      transaction_type,
    });

    return res.json(classToClass(checkList));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { agreement_transaction_id } = reqParams;

    const listEventSupplierMainTransactions = container.resolve(
      ListEventSupplierMainTransactionsService,
    );

    const checkList = await listEventSupplierMainTransactions.execute(
      agreement_transaction_id,
    );

    return res.json(classToClass(checkList));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventSupplierMainTransactionService = container.resolve(
      DeleteEventSupplierMainTransactionService,
    );

    const eventAppointment = await deleteEventSupplierMainTransactionService.execute(
      id,
    );

    return res.json(classToClass(eventAppointment));
  }
}
