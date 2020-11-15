import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyFunnelCardInfoService from '@modules/suppliers/services/CreateCompanyFunnelCardInfoService';
import UpdateCompanyFunnelCardInfoService from '@modules/suppliers/services/UpdateCompanyFunnelCardInfoService';
import ListCompanyFunnelCardInfosService from '@modules/suppliers/services/ListCompanyFunnelCardInfosService';
import DeleteCompanyFunnelCardInfoService from '@modules/suppliers/services/DeleteCompanyFunnelCardInfoService';

export default class CompanyFunnelCardInfosController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      funnel_card_field_id,
      card_unique_name,
      user_id,
      response,
    } = req.body;

    const createCompanyFunnelCardInfo = container.resolve(
      CreateCompanyFunnelCardInfoService,
    );

    const funnelCardInfo = await createCompanyFunnelCardInfo.execute({
      funnel_card_field_id,
      card_unique_name,
      user_id,
      response,
    });

    return res.json(classToClass(funnelCardInfo));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_unique_name } = dataParams;
    const listCompanyFunnelCardInfos = container.resolve(
      ListCompanyFunnelCardInfosService,
    );

    const funnelCardInfo = await listCompanyFunnelCardInfos.execute(
      card_unique_name,
    );

    return res.json(classToClass(funnelCardInfo));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { response } = req.body;
    const dataParams = req.params;
    const { id, card_unique_name, funnel_card_field_id } = dataParams;

    const updateCompanyFunnelCardInfo = container.resolve(
      UpdateCompanyFunnelCardInfoService,
    );

    const funnelCardInfo = await updateCompanyFunnelCardInfo.execute(
      id,
      card_unique_name,
      funnel_card_field_id,
      response,
    );

    return res.json(classToClass(funnelCardInfo));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCompanyFunnelCardInfo = container.resolve(
      DeleteCompanyFunnelCardInfoService,
    );

    await deleteCompanyFunnelCardInfo.execute(id);

    return res.status(200).send();
  }
}
