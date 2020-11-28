import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyContactWeplanUserService from '@modules/suppliers/services/CreateCompanyContactWeplanUserService';
import DeleteCompanyContactWeplanUserService from '@modules/suppliers/services/DeleteCompanyContactWeplanUserService';
import UpdateCompanyContactWeplanUserService from '@modules/suppliers/services/UpdateCompanyContactWPUserService';
import ShowCompanyContactWeplanUserService from '@modules/suppliers/services/ShowCompanyContactWeplanUserService';

export default class CompanyContactWeplanUsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_contact_id, user_id } = req.body;

    const createCompanyContactWeplanUsers = container.resolve(
      CreateCompanyContactWeplanUserService,
    );

    const companyContactWeplanUser = await createCompanyContactWeplanUsers.execute(
      {
        company_contact_id,
        user_id,
      },
    );

    return res.json(classToClass(companyContactWeplanUser));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_contact_id } = reqParams;
    const showCompanyContactWeplanUser = container.resolve(
      ShowCompanyContactWeplanUserService,
    );

    const companyContactWeplanUser = await showCompanyContactWeplanUser.execute(
      company_contact_id,
    );

    return res.json(classToClass(companyContactWeplanUser));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { user_id } = req.body;
    const updateCompanyContactWeplanUser = container.resolve(
      UpdateCompanyContactWeplanUserService,
    );

    const companyContactWeplanUser = await updateCompanyContactWeplanUser.execute(
      id,
      user_id,
    );

    return res.json(classToClass(companyContactWeplanUser));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCompanyContactWeplanUsers = container.resolve(
      DeleteCompanyContactWeplanUserService,
    );

    await deleteCompanyContactWeplanUsers.execute(id);

    return res.status(200).send();
  }
}
