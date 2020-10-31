import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyMasterUserService from '@modules/suppliers/services/CreateCompanyMasterUserService';
import ListCompanyMasterUsersService from '@modules/suppliers/services/ListCompanyMasterUsersService';
import ListUserCompanyMastersService from '@modules/suppliers/services/ListUserCompanyMastersService';
import ShowCompanyMasterUserService from '@modules/suppliers/services/ShowCompanyMasterUserService';
import UpdateCompanyMasterUserService from '@modules/suppliers/services/UpdateCompanyMasterUserService';
import DeleteCompanyMasterUserService from '@modules/suppliers/services/DeleteCompanyMasterUserService';

export default class CompanyMasterUsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_id, user_id } = reqParams;
    const { email, password } = req.body;

    const createCompanyMasterUsers = container.resolve(
      CreateCompanyMasterUserService,
    );

    const user = await createCompanyMasterUsers.execute({
      user_id,
      company_id,
      email,
      password,
    });

    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_id } = reqParams;
    const listCompanyMasterUsers = container.resolve(
      ListCompanyMasterUsersService,
    );

    const users = await listCompanyMasterUsers.execute(company_id);

    return res.json(classToClass(users));
  }

  public async listUserMasters(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;
    const listUserCompanyMasters = container.resolve(
      ListUserCompanyMastersService,
    );

    const users = await listUserCompanyMasters.execute(user_id);

    return res.json(classToClass(users));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id, company_id } = reqParams;
    const showCompanyMasterUser = container.resolve(
      ShowCompanyMasterUserService,
    );

    const user = await showCompanyMasterUser.execute(user_id, company_id);

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { isConfirmed, email } = req.body;

    const updateCompanyMasterUsers = container.resolve(
      UpdateCompanyMasterUserService,
    );

    const user = await updateCompanyMasterUsers.execute({
      id,
      isConfirmed,
      email,
    });

    return res.json(classToClass(user));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCompanyMasterUsers = container.resolve(
      DeleteCompanyMasterUserService,
    );

    await deleteCompanyMasterUsers.execute(id);

    return res.status(200).send();
  }
}
