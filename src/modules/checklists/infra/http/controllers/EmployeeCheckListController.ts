import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowEmployeeCheckListService from '@modules/checklists/services/ShowEmployeeCheckListService';
import CreateEmployeeCheckListService from '@modules/checklists/services/CreateEmployeeCheckListService';

export default class EmployeeCheckListController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { employee_id } = req.body;

    const createEmployeeCheckList = container.resolve(
      CreateEmployeeCheckListService,
    );

    const checkListTask = await createEmployeeCheckList.execute(employee_id);

    return res.json(classToClass(checkListTask));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { employee_id } = reqParams;

    const showEmployeeCheckList = container.resolve(
      ShowEmployeeCheckListService,
    );

    const checkListTask = await showEmployeeCheckList.execute(employee_id);

    return res.json(classToClass(checkListTask));
  }
}
