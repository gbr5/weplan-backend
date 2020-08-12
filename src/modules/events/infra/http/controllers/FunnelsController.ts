import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFunnelTypeService from '@modules/events/services/CreateFunnelTypeService';
import UpdateFunnelTypeService from '@modules/events/services/UpdateFunnelTypeService';
import ListFunnelTypesService from '@modules/events/services/ListFunnelTypesService';

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

    const funnelType = await listFunnelTypes.execute();

    return res.json(funnelType);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const updateFunnelType = container.resolve(UpdateFunnelTypeService);

    const funnelType = await updateFunnelType.execute({
      name,
    });

    return res.json(funnelType);
  }
}
