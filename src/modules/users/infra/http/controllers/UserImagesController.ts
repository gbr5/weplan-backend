import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserImageService from '@modules/users/services/CreateUserImageService';
import DeleteUserImageService from '@modules/users/services/DeleteUserImageService';
import UpdateUserImageService from '@modules/users/services/UpdateUserImageService';
import ListUserImagesService from '@modules/users/services/ListUserImagesService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { name, description } = reqParams;

    const user_id = req.user.id;

    const createUserImage = container.resolve(CreateUserImageService);

    const user = await createUserImage.execute({
      user_id,
      name,
      image_name: req.file.filename,
      description,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const listUsersImage = container.resolve(ListUserImagesService);

    const files = await listUsersImage.execute(user_id);

    return res.json(classToClass(files));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { name, description } = req.body;

    const updateUserImage = container.resolve(UpdateUserImageService);

    const updatedUserImage = await updateUserImage.execute({
      id,
      name,
      description,
    });

    return res.json(classToClass(updatedUserImage));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteUserImage = container.resolve(DeleteUserImageService);

    const file = await deleteUserImage.execute(id);

    return res.json(classToClass(file));
  }
}
