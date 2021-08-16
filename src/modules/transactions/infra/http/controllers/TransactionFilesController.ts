import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTransactionFileService from '@modules/transactions/services/CreateTransactionFileService';
import DeleteTransactionFileService from '@modules/transactions/services/DeleteTransactionFileService';
import ListTransactionFilesService from '@modules/transactions/services/ListTransactionFilesService';
import UpdateTransactionFileService from '@modules/transactions/services/UpdateTransactionFileService';

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { transaction_id } = reqParams;

    const createTransactionFile = container.resolve(
      CreateTransactionFileService,
    );

    const transaction = await createTransactionFile.execute({
      transaction_id,
      name: req.file.filename,
    });

    return res.json(classToClass(transaction));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const { name } = req.body;

    const updateTransactionFile = container.resolve(
      UpdateTransactionFileService,
    );

    const transaction = await updateTransactionFile.execute({
      id,
      name,
    });

    return res.json(classToClass(transaction));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { transaction_id } = reqParams;

    const listTransactionsFile = container.resolve(ListTransactionFilesService);

    const files = await listTransactionsFile.execute(transaction_id);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteTransactionFile = container.resolve(
      DeleteTransactionFileService,
    );

    await deleteTransactionFile.execute(id);

    return res.status(200).send();
  }
}
