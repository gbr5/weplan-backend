import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListGoogleProfilesService from '@modules/googleProfiles/services/ListGoogleProfilesService';

export default class GoogleProfileController {
  public async list(req: Request, res: Response): Promise<Response> {
    const listGoogleProfiles = container.resolve(ListGoogleProfilesService);

    const form = await listGoogleProfiles.execute();

    return res.json(classToClass(form));
  }
}
