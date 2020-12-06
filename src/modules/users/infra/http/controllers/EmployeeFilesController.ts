import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEmployeeFileService from '@modules/users/services/CreateEmployeeFileService';
import DeleteEmployeeFileService from '@modules/users/services/DeleteEmployeeFileService';
import ListEmployeeFilesService from '@modules/users/services/ListEmployeeFilesService';

export default class EmployeesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { employee_id, file_id } = req.body;

    const createEmployeeFile = container.resolve(CreateEmployeeFileService);

    const user = await createEmployeeFile.execute({
      employee_id,
      file_id,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { employee_id } = reqParams;

    const listEmployeesFile = container.resolve(ListEmployeeFilesService);

    const files = await listEmployeesFile.execute(employee_id);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEmployeeFile = container.resolve(DeleteEmployeeFileService);

    const file = await deleteEmployeeFile.execute(id);

    return res.json(classToClass(file));
  }
}
