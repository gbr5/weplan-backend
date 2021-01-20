import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ActivationUserService from '@modules/users/services/ActivationUserService';
import SendActivationAccountEmailService from '@modules/users/services/SendActivationAccountEmailService';

export default class ActivationUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendActivationAccountEmailService = container.resolve(
      SendActivationAccountEmailService,
    );

    await sendActivationAccountEmailService.execute({
      email,
    });

    return res.status(204).json();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { token } = reqParams;

    const activationUser = container.resolve(ActivationUserService);

    const user = await activationUser.execute({
      token,
    });

    return res.json(classToClass(user));
  }
}
