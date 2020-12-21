import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserConfirmationFileService from '@modules/users/services/CreateUserConfirmationFileService';
import DeleteUserConfirmationFileService from '@modules/users/services/DeleteUserConfirmationFileService';

export default class UserConfirmationFilesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { file_id, user_confirmation_id } = req.body;

    const createUserConfirmationFile = container.resolve(
      CreateUserConfirmationFileService,
    );

    const employee = await createUserConfirmationFile.execute({
      file_id,
      user_confirmation_id,
    });

    return res.json(classToClass(employee));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteUserConfirmationFile = container.resolve(
      DeleteUserConfirmationFileService,
    );

    await deleteUserConfirmationFile.execute(id);

    return res.status(200).send();
  }
}
