import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserBirthdateService from '@modules/users/services/CreateUserBirthdateService';
import UpdateUserBirthdateService from '@modules/users/services/UpdateUserBirthdateService';
import ShowUserBirthdateService from '@modules/users/services/ShowUserBirthdateService';

export default class UserBirthdateController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { date } = req.body;

    const createUserBirthdate = container.resolve(CreateUserBirthdateService);

    const userBirthdate = await createUserBirthdate.execute({
      user_id,
      date,
    });

    return res.json(userBirthdate);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showUserBirthdate = container.resolve(ShowUserBirthdateService);

    const userBirthdate = await showUserBirthdate.execute({ user_id });

    return res.json(userBirthdate);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    console.log('oi');
    const user_id = req.user.id;

    const { date } = req.body;
    console.log('user birthdate controller line 38', user_id, date);

    const updateUserBirthdate = container.resolve(UpdateUserBirthdateService);

    const userBirthdate = await updateUserBirthdate.execute({
      user_id,
      date,
    });
    console.log('user birthdate controller line 46', userBirthdate);

    return res.json(userBirthdate);
  }
}
