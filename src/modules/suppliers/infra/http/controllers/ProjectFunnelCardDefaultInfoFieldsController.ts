import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProjectFunnelCardDefaultInfoFieldsService from '@modules/suppliers/services/CreateProjectFunnelCardDefaultInfoFieldsService';

export default class ProjectFunnelCardDefaultInfoFieldsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company_id, funnel_id } = req.body;

    const createProjectFunnelCardDefaultInfoFields = container.resolve(
      CreateProjectFunnelCardDefaultInfoFieldsService,
    );

    const projectFunnelCardDefaultInfoFields = await createProjectFunnelCardDefaultInfoFields.execute(
      {
        company_id,
        funnel_id,
      },
    );

    return res.json(classToClass(projectFunnelCardDefaultInfoFields));
  }
}
