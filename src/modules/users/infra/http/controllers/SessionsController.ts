import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AuthenticateEnterpriseService from '@modules/users/services/AuthenticateEnterpriseService';

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

  public async createEnterprise(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateEnterpriseService);

    const {
      companyInfo,
      personInfo,
      modules,
      user,
      token,
    } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({
      userMaster: {
        id: user.id,
        email: user.email,
      },
      company: {
        id: user.company.id,
        name: user.company.name,
        email: user.company.email,
        avatar_url: user.company.getAvatarUrl()
          ? user.company.getAvatarUrl()
          : '',
      },
      person: {
        id: user.masterUser.id,
        name: user.masterUser.name,
        email: user.masterUser.email,
        avatar_url: user.masterUser.getAvatarUrl()
          ? user.masterUser.getAvatarUrl()
          : '',
      },
      companyInfo: {
        id: companyInfo.id,
        name: companyInfo.name,
        company_id: companyInfo.company_id,
        logo_url: companyInfo.logo_url ? companyInfo.logo_url : '',
      },
      personInfo,
      modules,
      token,
    });
  }
}
