import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFunnelStageService from '@modules/suppliers/services/CreateFunnelStageService';
import UpdateFunnelStageService from '@modules/suppliers/services/UpdateFunnelStageService';
import ListFunnelStagesService from '@modules/suppliers/services/ListFunnelStagesService';
import DeleteFunnelStageService from '@modules/suppliers/services/DeleteFunnelStageService';

export default class FunnelStageController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, funnel_order } = req.body;
    const dataParams = req.params;
    const { funnel_id } = dataParams;

    const createFunnelStage = container.resolve(CreateFunnelStageService);

    const funnelStage = await createFunnelStage.execute({
      name,
      funnel_id,
      funnel_order,
    });

    return res.json(classToClass(funnelStage));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { funnel_id } = dataParams;
    const listFunnelStages = container.resolve(ListFunnelStagesService);

    const funnelStage = await listFunnelStages.execute(funnel_id);

    return res.json(classToClass(funnelStage));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, funnel_order } = req.body;
    const dataParams = req.params;
    const { funnel_id, id } = dataParams;

    const updateFunnelStage = container.resolve(UpdateFunnelStageService);

    const funnelStage = await updateFunnelStage.execute(
      name,
      id,
      funnel_id,
      funnel_order,
    );

    return res.json(classToClass(funnelStage));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteFunnelStage = container.resolve(DeleteFunnelStageService);

    await deleteFunnelStage.execute(id);

    return res.status(200).send();
  }
}
