import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserContactInfoService from '@modules/users/services/CreateUserContactInfoService';
import UpdateUserContactInfoService from '@modules/users/services/UpdateUserContactInfoService';
import ShowUserContactInfoService from '@modules/users/services/ShowUserContactInfoService';
import ListUserContactInfosService from '@modules/users/services/ListUserContactInfosService';

export default class UserContactInfoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { contact_info, contact_type } = req.body;

    const createUserContactInfo = container.resolve(
      CreateUserContactInfoService,
    );

    const userContactInfo = await createUserContactInfo.execute({
      contact_info,
      user_id,
      contact_type,
    });

    return res.json(userContactInfo);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { user_id } = dataParams;

    const listUserContactInfo = container.resolve(ListUserContactInfosService);

    const userContactInfo = await listUserContactInfo.execute(user_id);

    return res.json(userContactInfo);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { user_id, contact_type } = dataParams;

    const showUserContactInfo = container.resolve(ShowUserContactInfoService);

    const userContactInfo = await showUserContactInfo.execute(
      user_id,
      contact_type,
    );

    return res.json(userContactInfo);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { contact_info } = req.body;
    const dataParams = req.params;
    const { contact_type } = dataParams;

    const updateUserContactInfo = container.resolve(
      UpdateUserContactInfoService,
    );

    const userContactInfo = await updateUserContactInfo.execute({
      contact_info,
      user_id,
      contact_type,
    });

    return res.json(userContactInfo);
  }
}
