import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerPaymentTransactionService from '@modules/transactions/services/CreateEventOwnerPaymentTransactionService';
import UpdateEventOwnerPaymentTransactionsService from '@modules/transactions/services/UpdateEventOwnerPaymentTransactionService';
import DeleteEventOwnerPaymentTransactionService from '@modules/transactions/services/DeleteEventOwnerPaymentTransactionService';
import ListEventOwnerPaymentTransactionsService from '@modules/transactions/services/ListEventOwnerPaymentTransactionsService';

export default class EventOwnerPaymentTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { main_transaction_id, payment_id, transaction_type } = req.body;

    const createEventOwnerPaymentTransactions = container.resolve(
      CreateEventOwnerPaymentTransactionService,
    );

    const checkList = await createEventOwnerPaymentTransactions.execute({
      main_transaction_id,
      payment_id,
      transaction_type,
    });

    return res.json(classToClass(checkList));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const { transaction_type } = req.body;

    const updateEventOwnerPaymentTransactions = container.resolve(
      UpdateEventOwnerPaymentTransactionsService,
    );

    const checkList = await updateEventOwnerPaymentTransactions.execute({
      id,
      transaction_type,
    });

    return res.json(classToClass(checkList));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { payment_id } = reqParams;

    const listEventOwnerPaymentTransactions = container.resolve(
      ListEventOwnerPaymentTransactionsService,
    );

    const checkList = await listEventOwnerPaymentTransactions.execute(
      payment_id,
    );

    return res.json(classToClass(checkList));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventOwnerPaymentTransactionService = container.resolve(
      DeleteEventOwnerPaymentTransactionService,
    );

    const eventAppointment = await deleteEventOwnerPaymentTransactionService.execute(
      id,
    );

    return res.json(classToClass(eventAppointment));
  }
}
