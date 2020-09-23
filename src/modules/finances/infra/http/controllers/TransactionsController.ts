import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionService from '@modules/finances/services/CreateTransactionService';
import ListTransactionsService from '@modules/finances/services/ListTransactionsService';
import DeleteTransactionService from '@modules/finances/services/DeleteTransactionService';
import UpdateTransactionService from '@modules/finances/services/UpdateTransactionService';

import { classToClass } from 'class-transformer';

export default class TransactionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { agreement_id } = reqParams;

    const listTransactions = container.resolve(ListTransactionsService);

    const transactions = await listTransactions.execute(agreement_id);

    return res.json(classToClass(transactions));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { agreement_id, amount, due_date, isPaid } = req.body;

    const createTransaction = container.resolve(CreateTransactionService);

    const eventAppointment = await createTransaction.execute({
      agreement_id,
      amount,
      due_date,
      isPaid,
    });

    return res.json(classToClass(eventAppointment));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { amount, due_date, isPaid } = req.body;

    const updateTransaction = container.resolve(UpdateTransactionService);

    const agreement = await updateTransaction.execute(
      id,
      amount,
      due_date,
      isPaid,
    );

    return res.json(classToClass(agreement));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteTransactionService = container.resolve(
      DeleteTransactionService,
    );

    const eventAppointment = await deleteTransactionService.execute(id);

    return res.json(classToClass(eventAppointment));
  }
}
