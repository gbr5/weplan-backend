import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SuspendAccountService from '@modules/users/services/SuspendAccountService';

export default class SuspendAccountControllerController {
  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const suspendAccount = container.resolve(SuspendAccountService);

    const user = await suspendAccount.execute({
      user_id,
    });

    return res.json(classToClass(user));
  }
}
