import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';
import ShowUserProfileByIdService from '@modules/users/services/ShowUserProfileByIdService';

export default class UserProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { email } = reqParams;

    const showProfile = container.resolve(ShowUserProfileService);

    const user = await showProfile.execute(email);

    return res.json(classToClass(user));
  }

  public async showById(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const showProfile = container.resolve(ShowUserProfileByIdService);

    const user = await showProfile.execute(id);

    return res.json(classToClass(user));
  }
}
