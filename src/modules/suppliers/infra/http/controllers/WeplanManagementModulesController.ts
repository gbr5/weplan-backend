import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWeplanManagementModuleService from '@modules/suppliers/services/CreateWeplanManagementModuleService';
import UpdateWeplanManagementModuleService from '@modules/suppliers/services/UpdateWeplanManagementModuleService';
import DeleteWeplanManagementModuleService from '@modules/suppliers/services/DeleteWeplanManagementModuleService';
import ListWeplanManagementModulesService from '@modules/suppliers/services/ListWeplanManagementModulesService';

export default class WeplanManagementModuleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const createWeplanManagementModule = container.resolve(
      CreateWeplanManagementModuleService,
    );

    const module = await createWeplanManagementModule.execute(name);

    return res.json(module);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listWeplanManagementModules = container.resolve(
      ListWeplanManagementModulesService,
    );

    const modules = await listWeplanManagementModules.execute();

    return res.json(modules);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { name } = req.body;

    const updateWeplanManagementModule = container.resolve(
      UpdateWeplanManagementModuleService,
    );

    const funnelType = await updateWeplanManagementModule.execute({
      id,
      name,
    });

    return res.json(funnelType);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteWeplanManagementModule = container.resolve(
      DeleteWeplanManagementModuleService,
    );

    await deleteWeplanManagementModule.execute(id);

    return res.status(200).send();
  }
}
