import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyContactInfoService from '@modules/suppliers/services/CreateCompanyContactInfoService';
import ListCompanyContactInfosService from '@modules/suppliers/services/ListCompanyContactInfosService';
import DeleteCompanyContactInfoService from '@modules/suppliers/services/DeleteCompanyContactInfoService';
import UpdateCompanyContactInfoService from '@modules/suppliers/services/UpdateCompanyContactInfoService';

export default class CompanyContactInfosController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_contact_id, info_type, info } = req.body;

    const createCompanyContactInfos = container.resolve(
      CreateCompanyContactInfoService,
    );

    const companyContactInfo = await createCompanyContactInfos.execute({
      company_contact_id,
      info_type,
      info,
    });

    return res.json(classToClass(companyContactInfo));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_contact_id } = reqParams;
    const listCompanyContactInfos = container.resolve(
      ListCompanyContactInfosService,
    );

    const companyContactInfos = await listCompanyContactInfos.execute(
      company_contact_id,
    );

    return res.json(classToClass(companyContactInfos));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { info_type, info } = req.body;
    const updateCompanyContactInfo = container.resolve(
      UpdateCompanyContactInfoService,
    );

    const companyContactInfo = await updateCompanyContactInfo.execute(
      id,
      info_type,
      info,
    );

    return res.json(classToClass(companyContactInfo));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCompanyContactInfos = container.resolve(
      DeleteCompanyContactInfoService,
    );

    await deleteCompanyContactInfos.execute(id);

    return res.status(200).send();
  }
}
