import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFunnelTypeService from '@modules/suppliers/services/CreateFunnelTypeService';
import UpdateFunnelTypeService from '@modules/suppliers/services/UpdateFunnelTypeService';
import ListFunnelTypesService from '@modules/suppliers/services/ListFunnelTypesService';

export default class FunnelTypeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createFunnelType = container.resolve(CreateFunnelTypeService);

    const funnelType = await createFunnelType.execute({
      name,
    });

    return res.json(funnelType);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listFunnelTypes = container.resolve(ListFunnelTypesService);

    const funnelTypes = await listFunnelTypes.execute();

    return res.json(funnelTypes);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { oldName } = reqParams;
    const { name } = req.body;

    const updateFunnelType = container.resolve(UpdateFunnelTypeService);

    const funnelType = await updateFunnelType.execute({
      name,
      oldName,
    });

    return res.json(funnelType);
  }
}
