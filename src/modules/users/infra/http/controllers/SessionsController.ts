import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AuthenticateEnterpriseService from '@modules/users/services/AuthenticateEnterpriseService';
import AuthenticatePROService from '@modules/users/services/AuthenticatePROService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }

  public async createPRO(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticatePROService);

    const {
      personInfo,
      companyInfo,
      modules,
      user,
      token,
    } = await authenticateUser.execute({
      email,
      password,
    });

    console.log({
      id: user.id,
      email: user.email,
      position: user.position,
      employee_avatar: user.avatar ? user.avatar : '',
      userInfo: classToClass(user.employee),
      company: classToClass(user.company),
      companyInfo,
      personInfo,
      modules,
      token,
    });

    return res.json({
      id: user.id,
      email: user.email,
      position: user.position,
      employee_avatar: user.avatar ? user.avatar : '',
      userInfo: classToClass(user.employee),
      company: classToClass(user.company),
      companyInfo,
      personInfo,
      modules,
      token,
    });
  }

  public async createEnterprise(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateEnterpriseService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}
