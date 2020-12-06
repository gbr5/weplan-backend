import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserFileService from '@modules/users/services/CreateUserFileService';
import DeleteUserFileService from '@modules/users/services/DeleteUserFileService';
import UpdateUserFileService from '@modules/users/services/UpdateUserFileService';
import ListUserFilesService from '@modules/users/services/ListUserFilesService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id, file_name } = reqParams;

    const createUserFile = container.resolve(CreateUserFileService);

    const user = await createUserFile.execute({
      user_id,
      url: req.file.filename,
      file_name,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const listUsersFile = container.resolve(ListUserFilesService);

    const files = await listUsersFile.execute(user_id);

    return res.json(classToClass(files));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { file_name, description } = req.body;

    const updateUserFile = container.resolve(UpdateUserFileService);

    const updatedUserFile = await updateUserFile.execute({
      id,
      file_name,
      description,
    });

    return res.json(classToClass(updatedUserFile));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteUserFile = container.resolve(DeleteUserFileService);

    const file = await deleteUserFile.execute(id);

    return res.json(classToClass(file));
  }
}
