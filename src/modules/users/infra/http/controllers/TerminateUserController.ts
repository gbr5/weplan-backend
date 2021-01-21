import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TerminateUserService from '@modules/users/services/TerminateUserService';

export default class TerminateUserController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const terminateUser = container.resolve(TerminateUserService);

    await terminateUser.execute({
      user_id,
    });

    return res.status(200).send();
  }
}
