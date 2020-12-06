import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateBudgetFileService from '@modules/users/services/CreateBudgetFileService';
import DeleteBudgetFileService from '@modules/users/services/DeleteBudgetFileService';
import ListBudgetFilesService from '@modules/users/services/ListBudgetFilesService';

export default class BudgetsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { budget_id, file_id } = req.body;

    const createBudgetFile = container.resolve(CreateBudgetFileService);

    const user = await createBudgetFile.execute({
      budget_id,
      file_id,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { budget_id } = reqParams;

    const listBudgetsFile = container.resolve(ListBudgetFilesService);

    const files = await listBudgetsFile.execute(budget_id);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteBudgetFile = container.resolve(DeleteBudgetFileService);

    const file = await deleteBudgetFile.execute(id);

    return res.json(classToClass(file));
  }
}
