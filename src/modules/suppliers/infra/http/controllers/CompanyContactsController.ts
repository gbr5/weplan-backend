import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyContactService from '@modules/suppliers/services/CreateCompanyContactService';
import ListCompanyContactsService from '@modules/suppliers/services/ListCompanyContactsService';
import DeleteCompanyContactService from '@modules/suppliers/services/DeleteCompanyContactService';
import ShowCompanyContactService from '@modules/suppliers/services/ShowCompanyContactService';
import UpdateCompanyContactNameService from '@modules/suppliers/services/UpdateCompanyContactNameService';
import UpdateCompanyContactFamilyNameService from '@modules/suppliers/services/UpdateCompanyContactFamilyNameService';
import UpdateCompanyContactDescriptionService from '@modules/suppliers/services/UpdateCompanyContactDescriptionService';
import UpdateCompanyContactTypeService from '@modules/suppliers/services/UpdateCompanyContactTypeService';
import UpdateCompanyContactWeplanUserService from '@modules/suppliers/services/UpdateCompanyContactWeplanUserService';
import UpdateCompanyContactIsCompanyService from '@modules/suppliers/services/UpdateCompanyContactIsCompanyService';
import UpdateCompanyContactIsNewService from '@modules/suppliers/services/UpdateCompanyContactIsNewService';

export default class CompanyContactsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      company_id,
      name,
      family_name,
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
      family_name,
      description,
      company_contact_type,
      weplanUser,
      isCompany,
      isNew: true,
    });

    return res.json(classToClass(companyContact));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_name = req.query.name;
    const companyContactName = String(user_name);
    const reqParams = req.params;
    const { company_id } = reqParams;
    const listCompanyContacts = container.resolve(ListCompanyContactsService);

    const companyContacts = await listCompanyContacts.execute(company_id);

    const sortedContacts = companyContacts.filter(contact =>
      contact.name.includes(companyContactName),
    );

    if (sortedContacts.length > 0) {
      return res.json(classToClass(sortedContacts));
    }

    return res.json(classToClass(companyContacts));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const showCompanyContact = container.resolve(ShowCompanyContactService);

    const companyContacts = await showCompanyContact.execute(id);

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

  public async updateFamilyName(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { family_name } = req.body;
    const updateCompanyContactFamilyName = container.resolve(
      UpdateCompanyContactFamilyNameService,
    );

    const companyContact = await updateCompanyContactFamilyName.execute(
      id,
      family_name,
    );

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
    const updateCompanyContactWeplanUser = container.resolve(
      UpdateCompanyContactWeplanUserService,
    );

    const companyContact = await updateCompanyContactWeplanUser.execute(id);

    return res.json(classToClass(companyContact));
  }

  public async updateIsCompany(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const updateCompanyContactIsCompany = container.resolve(
      UpdateCompanyContactIsCompanyService,
    );

    const companyContact = await updateCompanyContactIsCompany.execute(id);

    return res.json(classToClass(companyContact));
  }

  public async updateIsNew(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const updateCompanyContactIsNew = container.resolve(
      UpdateCompanyContactIsNewService,
    );

    const companyContact = await updateCompanyContactIsNew.execute(id);

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
