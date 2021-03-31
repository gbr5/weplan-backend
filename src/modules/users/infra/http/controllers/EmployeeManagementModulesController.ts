import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListEmployeeManagementModulesService from '@modules/users/services/ListEmployeeManagementModulesService';

export default class EmployeeManagmentModulesController {
  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { employee_id } = reqParams;
    const listUserManagementModules = container.resolve(
      ListEmployeeManagementModulesService,
    );

    const employee = await listUserManagementModules.execute(employee_id);

    return res.json(classToClass(employee));
  }
}
