import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFunnelService from '@modules/suppliers/services/CreateFunnelService';
import UpdateFunnelService from '@modules/suppliers/services/UpdateFunnelService';
import ListFunnelsService from '@modules/suppliers/services/ListFunnelsService';
import DeleteFunnelService from '@modules/suppliers/services/DeleteFunnelService';

export default class FunnelController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, funnel_type } = req.body;
    const dataParams = req.params;
    const { supplier_id } = dataParams;

    const createFunnel = container.resolve(CreateFunnelService);

    const funnel = await createFunnel.execute(name, supplier_id, funnel_type);

    return res.json(classToClass(funnel));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { supplier_id } = dataParams;
    const listFunnels = container.resolve(ListFunnelsService);

    const funnel = await listFunnels.execute(supplier_id);

    return res.json(classToClass(funnel));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const dataParams = req.params;
    const { id } = dataParams;

    const updateFunnel = container.resolve(UpdateFunnelService);

    const funnel = await updateFunnel.execute(name, id);

    return res.json(classToClass(funnel));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteFunnel = container.resolve(DeleteFunnelService);

    await deleteFunnel.execute(id);

    return res.status(200).send();
  }
}
