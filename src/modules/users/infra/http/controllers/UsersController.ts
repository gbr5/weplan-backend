import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import ListUserService from '@modules/users/services/ListUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, isCompany } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      isCompany,
    });

    return res.json(classToClass(user));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ user_id });

    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_name = req.query.name;
    const userName = String(user_name);
    const unique_name = req.query.uniqueName;
    const uniqueName = String(unique_name);
    const user_email = req.query.email;
    const email = String(user_email);
    const user_id = req.user.id;

    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    const sortedUsersByName = users.filter(user =>
      user.name.includes(userName),
    );

    if (userName && userName !== '' && sortedUsersByName.length > 0) {
      return res.json(classToClass(sortedUsersByName));
    }

    const filteredUsers = users.filter(user => user.id !== user_id);

    if (email && email !== '') {
      const findUserByEmail = filteredUsers.filter(
        xUser => xUser.email === email,
      );
      if (findUserByEmail.length === 1)
        return res.json(classToClass(findUserByEmail));
    }
    if (uniqueName && uniqueName !== '') {
      const findUserByUniqueName = filteredUsers.filter(
        xUser => xUser.name === uniqueName,
      );
      if (findUserByUniqueName.length === 1)
        return res.json(classToClass(findUserByUniqueName));
    }
    return res.json(classToClass(users));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { name, email } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      email,
      user_id,
      name,
    });

    return res.json(classToClass(user));
  }
}
