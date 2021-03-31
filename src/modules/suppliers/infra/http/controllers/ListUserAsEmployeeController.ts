import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUserAsEmployeeService from '@modules/suppliers/services/ListUserAsEmployeeService';

export default class ListUserAsEmployeeController {
  public async listUserEmployee(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const employee_id = req.user.id;
    const listUserAsEmployeeService = container.resolve(
      ListUserAsEmployeeService,
    );

    const employees = await listUserAsEmployeeService.execute(employee_id);

    return res.json(classToClass(employees));
  }
}
