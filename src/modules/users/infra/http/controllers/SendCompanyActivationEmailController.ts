import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendCompanyActivationEmailService from '@modules/users/services/SendCompanyActivationEmailService';

export default class ActivationUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendActivationAccountEmailService = container.resolve(
      SendCompanyActivationEmailService,
    );

    await sendActivationAccountEmailService.execute({
      email,
    });

    return res.status(204).json();
  }
}
