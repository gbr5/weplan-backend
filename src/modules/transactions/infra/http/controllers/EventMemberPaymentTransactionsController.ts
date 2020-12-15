import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventMemberPaymentTransactionService from '@modules/transactions/services/CreateEventMemberPaymentTransactionService';
import UpdateEventMemberPaymentTransactionsService from '@modules/transactions/services/UpdateEventMemberPaymentTransactionService';
import DeleteEventMemberPaymentTransactionService from '@modules/transactions/services/DeleteEventMemberPaymentTransactionService';
import ListEventMemberPaymentTransactionsService from '@modules/transactions/services/ListEventMemberPaymentTransactionsService';

export default class EventMemberPaymentTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { main_transaction_id, payment_id, transaction_type } = req.body;

    const createEventMemberPaymentTransactions = container.resolve(
      CreateEventMemberPaymentTransactionService,
    );

    const checkList = await createEventMemberPaymentTransactions.execute({
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

    const updateEventMemberPaymentTransactions = container.resolve(
      UpdateEventMemberPaymentTransactionsService,
    );

    const checkList = await updateEventMemberPaymentTransactions.execute({
      id,
      transaction_type,
    });

    return res.json(classToClass(checkList));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { payment_id } = reqParams;

    const listEventMemberPaymentTransactions = container.resolve(
      ListEventMemberPaymentTransactionsService,
    );

    const checkList = await listEventMemberPaymentTransactions.execute(
      payment_id,
    );

    return res.json(classToClass(checkList));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventMemberPaymentTransactionService = container.resolve(
      DeleteEventMemberPaymentTransactionService,
    );

    const eventAppointment = await deleteEventMemberPaymentTransactionService.execute(
      id,
    );

    return res.json(classToClass(eventAppointment));
  }
}
