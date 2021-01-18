import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class DeleteUserController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({
      user_id,
    });

    return res.json(classToClass(user));
  }
}
