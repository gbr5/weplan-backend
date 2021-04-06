import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserService from '@modules/users/services/ListUserService';

export default class FindByNameOrEmailController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_name = req.query.name;
    const name = String(user_name);
    const user_email = req.query.email;
    const email = String(user_email);

    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    if (name) {
      const findUserByName = users.find(user => user.name === name);
      const findUserByTrimmedName = users.find(
        user => user.trimmed_name === name,
      );

      if (findUserByName) {
        return res.json(classToClass(findUserByName));
      }

      if (findUserByTrimmedName) {
        return res.json(classToClass(findUserByTrimmedName));
      }
    }

    if (email) {
      const findUserByEmail = users.find(user => user.email === email);

      if (findUserByEmail) {
        return res.json(classToClass(findUserByEmail));
      }
    }
    return res.json();
  }
}
