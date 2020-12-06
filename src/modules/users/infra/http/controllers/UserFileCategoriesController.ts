import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserFileCategoryService from '@modules/users/services/CreateUserFileCategoryService';
import DeleteUserFileCategoryService from '@modules/users/services/DeleteUserFileCategoryService';
import UpdateUserFileCategoryService from '@modules/users/services/UpdateUserFileCategoryService';
import ListUserFileCategoriesService from '@modules/users/services/ListUserFileCategoriesService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, name, description, color } = req.body;

    const createUserFile = container.resolve(CreateUserFileCategoryService);

    const user = await createUserFile.execute({
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

    const listUsersFile = container.resolve(ListUserFileCategoriesService);

    const files = await listUsersFile.execute(user_id);

    return res.json(classToClass(files));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { name, description, color } = req.body;

    const updateUserFileCategory = container.resolve(
      UpdateUserFileCategoryService,
    );

    const updatedUserFile = await updateUserFileCategory.execute({
      id,
      name,
      description,
      color,
    });

    return res.json(classToClass(updatedUserFile));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteUserFile = container.resolve(DeleteUserFileCategoryService);

    const file = await deleteUserFile.execute(id);

    return res.json(classToClass(file));
  }
}
