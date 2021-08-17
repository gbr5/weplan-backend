import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserService from '@modules/users/services/ListUserService';
import AppError from '@shared/errors/AppError';

export default class FindUserByEmailOrUserNameController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_name = req.query.name;
    const userName = String(user_name);
    const user_email = req.query.email;
    const email = String(user_email);

    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute();

    if (userName && userName !== '') {
      const findUser = users.find(user => user.name === userName);
      if (findUser) {
        throw new AppError('This name is already taken!');
      }
    }

    if (email && email !== '') {
      const findUser = users.find(user => user.email === email);
      if (findUser) {
        throw new AppError('This email is already taken!');
      }
    }
    return res.status(200).send();
  }
}
