import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ActivationUserService from '@modules/users/services/ActivationUserService';

export default class ActivationUserController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;
    const { isActive } = req.body;

    const activationUser = container.resolve(ActivationUserService);

    const user = await activationUser.execute({
      user_id,
      isActive,
    });

    return res.json(classToClass(user));
  }
}
