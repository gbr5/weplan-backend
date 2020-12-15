import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserTransactionService from '@modules/transactions/services/CreateUserTransactionService';
import UpdateUserTransactionsService from '@modules/transactions/services/UpdateUserTransactionService';
import DeleteUserTransactionService from '@modules/transactions/services/DeleteUserTransactionService';
import ListUserTransactionsService from '@modules/transactions/services/ListUserTransactionsService';

export default class UserTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      main_transaction_id,
      user_id,
      weplanUser,
      weplanUserType,
      transaction_type,
      description,
    } = req.body;

    const createUserTransactions = container.resolve(
      CreateUserTransactionService,
    );

    const checkList = await createUserTransactions.execute({
      main_transaction_id,
      user_id,
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

    const updateUserTransactions = container.resolve(
      UpdateUserTransactionsService,
    );

    const checkList = await updateUserTransactions.execute({
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
    const { user_id } = reqParams;

    const listUserTransactions = container.resolve(ListUserTransactionsService);

    const checkList = await listUserTransactions.execute(user_id);

    return res.json(classToClass(checkList));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteUserTransactionService = container.resolve(
      DeleteUserTransactionService,
    );

    const userAppointment = await deleteUserTransactionService.execute(id);

    return res.json(classToClass(userAppointment));
  }
}
