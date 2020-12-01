import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyDefaultServiceOrderFieldService from '@modules/suppliers/services/CreateCompanyDefaultServiceOrderFieldService';
import ListCompanyDefaultServiceOrderFieldsService from '@modules/suppliers/services/ListCompanyDefaultServiceOrderFieldsService';
import DeleteCompanyDefaultServiceOrderFieldService from '@modules/suppliers/services/DeleteCompanyDefaultServiceOrderFieldService';
import UpdateCompanyDefaultServiceOrderFieldService from '@modules/suppliers/services/UpdateCompanyDefaultServiceOrderFieldService';

export default class CompanyDefaultServiceOrderFieldsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id, field_name, field_type, isRequired } = req.body;

    const createCompanyDefaultServiceOrderFields = container.resolve(
      CreateCompanyDefaultServiceOrderFieldService,
    );

    const company = await createCompanyDefaultServiceOrderFields.execute({
      company_id,
      field_name,
      field_type,
      isRequired,
    });

    return res.json(classToClass(company));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { company_id } = dataParams;

    const listCompanyDefaultServiceOrderFields = container.resolve(
      ListCompanyDefaultServiceOrderFieldsService,
    );

    const companys = await listCompanyDefaultServiceOrderFields.execute(
      company_id,
    );

    return res.json(classToClass(companys));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const { field_name, field_type, isRequired } = req.body;

    const companyDefaultServiceOrderField = container.resolve(
      UpdateCompanyDefaultServiceOrderFieldService,
    );

    const updatedCompanyDefaultServiceOrderField = await companyDefaultServiceOrderField.execute(
      {
        id,
        field_name,
        field_type,
        isRequired,
      },
    );

    return res.json(classToClass(updatedCompanyDefaultServiceOrderField));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCompanyDefaultServiceOrderField = container.resolve(
      DeleteCompanyDefaultServiceOrderFieldService,
    );

    await deleteCompanyDefaultServiceOrderField.execute(id);

    return res.status(200).send();
  }
}
