import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyContactService from '@modules/suppliers/services/CreateCompanyContactService';
import ListCompanyContactsService from '@modules/suppliers/services/ListCompanyContactsService';
import DeleteCompanyContactService from '@modules/suppliers/services/DeleteCompanyContactService';
import UpdateCompanyContactNameService from '@modules/suppliers/services/UpdateCompanyContactNameService';
import UpdateCompanyContactDescriptionService from '@modules/suppliers/services/UpdateCompanyContactDescriptionService';
import UpdateCompanyContactTypeService from '@modules/suppliers/services/UpdateCompanyContactTypeService';
import UpdateCompanyContactWeplanUserService from '@modules/suppliers/services/UpdateCompanyContactWeplanUserService';
import UpdateCompanyContactIsCompanyService from '@modules/suppliers/services/UpdateCompanyContactIsCompanyService';

export default class CompanyContactsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      company_id,
      name,
      description,
      company_contact_type,
      weplanUser,
      isCompany,
    } = req.body;

    const createCompanyContacts = container.resolve(
      CreateCompanyContactService,
    );

    const companyContact = await createCompanyContacts.execute({
      company_id,
      name,
      description,
      company_contact_type,
      weplanUser,
      isCompany,
    });

    return res.json(classToClass(companyContact));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_id } = reqParams;
    const listCompanyContacts = container.resolve(ListCompanyContactsService);

    const companyContacts = await listCompanyContacts.execute(company_id);

    return res.json(classToClass(companyContacts));
  }

  public async updateName(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { name } = req.body;
    const updateCompanyContactName = container.resolve(
      UpdateCompanyContactNameService,
    );

    const companyContact = await updateCompanyContactName.execute(id, name);

    return res.json(classToClass(companyContact));
  }

  public async updateDescription(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { description } = req.body;
    const updateCompanyContactDescription = container.resolve(
      UpdateCompanyContactDescriptionService,
    );

    const companyContact = await updateCompanyContactDescription.execute(
      id,
      description,
    );

    return res.json(classToClass(companyContact));
  }

  public async updateCompanyContactType(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { company_contact_type } = req.body;
    const updateCompanyContactType = container.resolve(
      UpdateCompanyContactTypeService,
    );

    const companyContact = await updateCompanyContactType.execute(
      id,
      company_contact_type,
    );

    return res.json(classToClass(companyContact));
  }

  public async updateWeplanUser(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { weplanUser } = req.body;
    const updateCompanyContactWeplanUser = container.resolve(
      UpdateCompanyContactWeplanUserService,
    );

    const companyContact = await updateCompanyContactWeplanUser.execute(
      id,
      weplanUser,
    );

    return res.json(classToClass(companyContact));
  }

  public async updateIsCompany(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { isCompany } = req.body;
    const updateCompanyContactIsCompany = container.resolve(
      UpdateCompanyContactIsCompanyService,
    );

    const companyContact = await updateCompanyContactIsCompany.execute(
      id,
      isCompany,
    );

    return res.json(classToClass(companyContact));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCompanyContacts = container.resolve(
      DeleteCompanyContactService,
    );

    await deleteCompanyContacts.execute(id);

    return res.status(200).send();
  }
}