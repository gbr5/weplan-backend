import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserWithGoogleService from '@modules/users/services/AuthenticateUserWithGoogleService';

export default class AuthenticateUserWithGoogleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      email,
      token,
      name,
      givenName,
      familyName,
      imageUrl,
      googleId,
    } = req.body;

    const updateProfile = container.resolve(AuthenticateUserWithGoogleService);

    const user = await updateProfile.execute({
      googleEmail: email,
      googleToken: token,
      familyName,
      givenName,
      googleId,
      imageUrl,
      name,
    });

    return res.json(classToClass(user));
  }
}
