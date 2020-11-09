import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListCheckListTasksByCompanyAndOwnerIDService from '@modules/checklists/services/ListCheckListTasksByCompanyAndOwnerIDService';

export default class CompanyUserEmployeeTasksController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_id, owner_id } = reqParams;

    const listCheckListTasks = container.resolve(
      ListCheckListTasksByCompanyAndOwnerIDService,
    );

    const checkListTasks = await listCheckListTasks.execute({
      company_id,
      owner_id,
    });
    console.log('resultado: ', checkListTasks);

    return res.json(classToClass(checkListTasks));
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const reqParams = req.params;
  //   const { id } = reqParams;

  //   const { task, color, isActive, status, priority, due_date } = req.body;

  //   const updateCheckListTasks = container.resolve(UpdateCheckListTasksService);

  //   const checkListTask = await updateCheckListTasks.execute({
  //     id,
  //     task,
  //     color,
  //     isActive,
  //     priority,
  //     status,
  //     due_date,
  //   });

  //   return res.json(classToClass(checkListTask));
  // }
}
