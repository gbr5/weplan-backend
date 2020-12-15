import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMainTransactionService from '@modules/transactions/services/CreateMainTransactionService';
import UpdateMainTransactionsService from '@modules/transactions/services/UpdateMainTransactionService';
import DeleteMainTransactionService from '@modules/transactions/services/DeleteMainTransactionService';
import ListMainTransactionsService from '@modules/transactions/services/ListMainTransactionsService';

export default class MainTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { value, date } = req.body;

    const createMainTransactions = container.resolve(
      CreateMainTransactionService,
    );

    const mainTransaction = await createMainTransactions.execute({
      value,
      date,
    });

    return res.json(classToClass(mainTransaction));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const updateMainTransactions = container.resolve(
      ListMainTransactionsService,
    );

    const mainTransaction = await updateMainTransactions.execute();

    return res.json(classToClass(mainTransaction));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const { date, value } = req.body;

    const updateMainTransactions = container.resolve(
      UpdateMainTransactionsService,
    );

    const mainTransaction = await updateMainTransactions.execute({
      id,
      date,
      value,
    });

    return res.json(classToClass(mainTransaction));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteMainTransactionService = container.resolve(
      DeleteMainTransactionService,
    );

    const eventAppointment = await deleteMainTransactionService.execute(id);

    return res.json(classToClass(eventAppointment));
  }
}
