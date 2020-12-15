import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventTransactionService from '@modules/transactions/services/CreateEventTransactionService';
import UpdateEventTransactionsService from '@modules/transactions/services/UpdateEventTransactionService';
import DeleteEventTransactionService from '@modules/transactions/services/DeleteEventTransactionService';
import ListEventTransactionsService from '@modules/transactions/services/ListEventTransactionsService';

export default class EventTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      main_transaction_id,
      event_id,
      weplanUser,
      weplanUserType,
      transaction_type,
      description,
    } = req.body;

    const createEventTransactions = container.resolve(
      CreateEventTransactionService,
    );

    const checkList = await createEventTransactions.execute({
      main_transaction_id,
      event_id,
      weplanUser,
      weplanUserType,
      transaction_type,
      description,
    });

    return res.json(classToClass(checkList));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const {
      weplanUser,
      weplanUserType,
      transaction_type,
      description,
    } = req.body;

    const updateEventTransactions = container.resolve(
      UpdateEventTransactionsService,
    );

    const checkList = await updateEventTransactions.execute({
      id,
      weplanUser,
      weplanUserType,
      transaction_type,
      description,
    });

    return res.json(classToClass(checkList));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;

    const listEventTransactions = container.resolve(
      ListEventTransactionsService,
    );

    const checkList = await listEventTransactions.execute(event_id);

    return res.json(classToClass(checkList));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteEventTransactionService = container.resolve(
      DeleteEventTransactionService,
    );

    const eventAppointment = await deleteEventTransactionService.execute(id);

    return res.json(classToClass(eventAppointment));
  }
}
