import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyInfoService from '@modules/users/services/CreateCompanyInfoService';
import UpdateCompanyInfoService from '@modules/users/services/UpdateCompanyInfoService';
import ShowCompanyInfoService from '@modules/users/services/ShowCompanyInfoService';

export default class CompanyInfoController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { company_id, name } = req.body;

    const createCompanyInfo = container.resolve(CreateCompanyInfoService);

    const companyInfo = await createCompanyInfo.execute({
      company_id,
      user_id,
      name,
    });

    return res.json(classToClass(companyInfo));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showCompanyInfo = container.resolve(ShowCompanyInfoService);

    const companyInfo = await showCompanyInfo.execute({ user_id });

    return res.json(classToClass(companyInfo));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const { name, company_id } = req.body;

    const updateCompanyInfo = container.resolve(UpdateCompanyInfoService);

    const companyInfo = await updateCompanyInfo.execute({
      company_id,
      user_id,
      name,
    });

    return res.json(classToClass(companyInfo));
  }
}
