import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserWithAppleService from '@modules/users/services/AuthenticateUserWithAppleService';

export default class AuthenticateUserWithAppleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider, appleResponse } = req.body;

    const updateProfile = container.resolve(AuthenticateUserWithAppleService);

    const user = await updateProfile.execute({
      provider,
      appleResponse,
    });

    return res.json(classToClass(user));
  }
}
