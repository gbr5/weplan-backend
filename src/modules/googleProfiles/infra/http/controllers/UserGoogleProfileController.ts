import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserGoogleProfileService from '@modules/googleProfiles/services/CreateUserGoogleProfileService';
import DeleteUserGoogleProfileService from '@modules/googleProfiles/services/DeleteUserGoogleProfileService';
import ShowUserGoogleProfileService from '@modules/googleProfiles/services/ShowUserGoogleProfileService';

export default class UserGoogleProfileController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { profileObj } = req.body;
    const createGoogleProfiles = container.resolve(
      CreateUserGoogleProfileService,
    );

    const form = await createGoogleProfiles.execute({
      user_id,
      profileObj,
    });

    return res.json(form);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { user_id } = dataParams;
    const showGoogleProfile = container.resolve(ShowUserGoogleProfileService);

    const userGoogleProfile = await showGoogleProfile.execute(user_id);

    return res.status(200).json(userGoogleProfile);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteGoogleProfile = container.resolve(
      DeleteUserGoogleProfileService,
    );

    await deleteGoogleProfile.execute(id);

    return res.status(200).send();
  }
}
