import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateEmployeePROWithGoogleService from '@modules/users/services/AuthenticateEmployeePROWithGoogleService';

export default class AuthenticateEmployeePROWithGoogleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, token } = req.body;

    const authenticateEmployee = container.resolve(
      AuthenticateEmployeePROWithGoogleService,
    );

    const user = await authenticateEmployee.execute({
      googleEmail: email,
      googleToken: token,
    });

    return res.json(classToClass(user));
  }
}
