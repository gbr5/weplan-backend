import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyEmployeeContactService from '@modules/suppliers/services/CreateCompanyEmployeeContactService';
import ShowCompanyEmployeeContactService from '@modules/suppliers/services/ShowCompanyEmployeeContactService';
import ShowCompanyEmployeeContactByEmployeeIDService from '@modules/suppliers/services/ShowCompanyEmployeeContactByEmployeeIDService';

export default class CompanyEmployeeContactsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_contact_id, employee_id } = req.body;

    const createCompanyEmployeeContacts = container.resolve(
      CreateCompanyEmployeeContactService,
    );

    const card = await createCompanyEmployeeContacts.execute({
      company_contact_id,
      employee_id,
    });

    return res.json(classToClass(card));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { company_contact_id } = dataParams;

    const listCompanyEmployeeContacts = container.resolve(
      ShowCompanyEmployeeContactService,
    );

    const cards = await listCompanyEmployeeContacts.execute(company_contact_id);

    return res.json(classToClass(cards));
  }

  public async showEmployee(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { employee_id } = dataParams;

    const showCompanyEmployeeContact = container.resolve(
      ShowCompanyEmployeeContactByEmployeeIDService,
    );

    const cards = await showCompanyEmployeeContact.execute(employee_id);

    return res.json(classToClass(cards));
  }
}
