import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyFunnelCardInfoFieldService from '@modules/suppliers/services/CreateCompanyFunnelCardInfoFieldService';
import UpdateCompanyFunnelCardInfoFieldService from '@modules/suppliers/services/UpdateCompanyFunnelCardInfoFieldService';
import ListCompanyFunnelCardInfoFieldsService from '@modules/suppliers/services/ListCompanyFunnelCardInfoFieldsService';
import DeleteCompanyFunnelCardInfoFieldService from '@modules/suppliers/services/DeleteCompanyFunnelCardInfoFieldService';

export default class CompanyFunnelCardInfoFieldsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { funnel_id, name, field_type, isRequired } = req.body;
    const dataParams = req.params;
    const { company_id } = dataParams;

    const createCompanyFunnelCardInfoField = container.resolve(
      CreateCompanyFunnelCardInfoFieldService,
    );

    const funnelCardInfoField = await createCompanyFunnelCardInfoField.execute({
      company_id,
      funnel_id,
      name,
      field_type,
      isRequired,
    });

    return res.json(classToClass(funnelCardInfoField));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { funnel_id } = dataParams;
    const listCompanyFunnelCardInfoFields = container.resolve(
      ListCompanyFunnelCardInfoFieldsService,
    );

    const funnelCardInfoField = await listCompanyFunnelCardInfoFields.execute(
      funnel_id,
    );

    return res.json(classToClass(funnelCardInfoField));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, field_type, isRequired } = req.body;
    const dataParams = req.params;
    const { funnel_id, id } = dataParams;

    const updateCompanyFunnelCardInfoField = container.resolve(
      UpdateCompanyFunnelCardInfoFieldService,
    );

    const funnelCardInfoField = await updateCompanyFunnelCardInfoField.execute(
      id,
      funnel_id,
      name,
      field_type,
      isRequired,
    );

    return res.json(classToClass(funnelCardInfoField));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCompanyFunnelCardInfoField = container.resolve(
      DeleteCompanyFunnelCardInfoFieldService,
    );

    await deleteCompanyFunnelCardInfoField.execute(id);

    return res.status(200).send();
  }
}
