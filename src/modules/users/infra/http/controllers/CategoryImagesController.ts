import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCategoryImageService from '@modules/users/services/CreateCategoryImageService';
import DeleteCategoryImageService from '@modules/users/services/DeleteCategoryImageService';
import ListCategoryImagesService from '@modules/users/services/ListCategoryImagesService';

export default class CategoryImagesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { category_id, image_id } = req.body;

    const createCategoryImage = container.resolve(CreateCategoryImageService);

    const user = await createCategoryImage.execute({
      category_id,
      image_id,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { category_id } = reqParams;

    const listCategoryImage = container.resolve(ListCategoryImagesService);

    const images = await listCategoryImage.execute(category_id);

    return res.json(classToClass(images));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCategoryImage = container.resolve(DeleteCategoryImageService);

    const image = await deleteCategoryImage.execute(id);

    return res.json(classToClass(image));
  }
}
