import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryFileService from '@modules/users/services/CreateCategoryFileService';
import DeleteCategoryFileService from '@modules/users/services/DeleteCategoryFileService';
import ListCategoryFilesService from '@modules/users/services/ListCategoryFilesService';

export default class CategorysController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { category_id, file_id } = req.body;

    const createCategoryFile = container.resolve(CreateCategoryFileService);

    const user = await createCategoryFile.execute({
      category_id,
      file_id,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { category_id } = reqParams;

    const listCategorysFile = container.resolve(ListCategoryFilesService);

    const files = await listCategorysFile.execute(category_id);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCategoryFile = container.resolve(DeleteCategoryFileService);

    const file = await deleteCategoryFile.execute(id);

    return res.json(classToClass(file));
  }
}
