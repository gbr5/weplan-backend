import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserImageCategoryService from '@modules/users/services/CreateUserImageCategoryService';
import DeleteUserImageCategoryService from '@modules/users/services/DeleteUserImageCategoryService';
import UpdateUserImageCategoryService from '@modules/users/services/UpdateUserImageCategoryService';
import ListUserImageCategoriesService from '@modules/users/services/ListUserImageCategoriesService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, name, description, color } = req.body;

    const createUserImage = container.resolve(CreateUserImageCategoryService);

    const user = await createUserImage.execute({
      user_id,
      name,
      description,
      color,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const listUsersImage = container.resolve(ListUserImageCategoriesService);

    const images = await listUsersImage.execute(user_id);

    return res.json(classToClass(images));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { name, description, color } = req.body;

    const updateUserImageCategory = container.resolve(
      UpdateUserImageCategoryService,
    );

    const updatedUserImage = await updateUserImageCategory.execute({
      id,
      name,
      description,
      color,
    });

    return res.json(classToClass(updatedUserImage));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteUserImage = container.resolve(DeleteUserImageCategoryService);

    const image = await deleteUserImage.execute(id);

    return res.json(classToClass(image));
  }
}
