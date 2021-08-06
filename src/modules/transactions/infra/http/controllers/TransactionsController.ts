import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';
import UpdateTransactionService from '@modules/transactions/services/UpdateTransactionService';

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, amount, due_date, isPaid, payee_id, payer_id } = req.body;

    const createTransactionService = container.resolve(
      CreateTransactionService,
    );

    const transaction = await createTransactionService.execute({
      name,
      amount,
      due_date,
      isPaid,
      payee_id,
      payer_id,
    });

    return res.json(classToClass(transaction));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, amount, due_date, isPaid, isCancelled } = req.body;

    const updateTransactionService = container.resolve(
      UpdateTransactionService,
    );

    const transaction = await updateTransactionService.execute({
      id,
      name,
      amount,
      due_date,
      isPaid,
      isCancelled,
    });

    return res.json(classToClass(transaction));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteTransactionService = container.resolve(
      DeleteTransactionService,
    );

    await deleteTransactionService.execute(id);

    return res.status(200).send();
  }
}
