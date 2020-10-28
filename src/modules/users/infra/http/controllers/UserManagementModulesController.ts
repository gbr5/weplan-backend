import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserManagementModuleService from '@modules/users/services/CreateUserManagementModuleService';
import UpdateUserManagementModuleService from '@modules/users/services/UpdateUserManagementModuleService';
import DeleteUserManagementModuleService from '@modules/users/services/DeleteUserManagementModuleService';
import ListUserManagementModulesService from '@modules/users/services/ListUserManagementModulesService';

export default class UserManagmentModulesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, management_module, access_level } = req.body;

    const createUserManagementModule = container.resolve(
      CreateUserManagementModuleService,
    );

    const employee = await createUserManagementModule.execute({
      user_id,
      management_module,
      access_level,
    });

    return res.json(classToClass(employee));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { access_level } = req.body;

    const updateUserManagementModule = container.resolve(
      UpdateUserManagementModuleService,
    );

    const employee = await updateUserManagementModule.execute({
      id,
      access_level,
    });

    return res.json(classToClass(employee));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;
    const listUserManagementModules = container.resolve(
      ListUserManagementModulesService,
    );

    const employee = await listUserManagementModules.execute(user_id);

    return res.json(classToClass(employee));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteUserManagementModule = container.resolve(
      DeleteUserManagementModuleService,
    );

    await deleteUserManagementModule.execute(id);

    return res.status(200).send();
  }
}
