import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateEmployeePROService from '@modules/users/services/AuthenticateEmployeePROService';

export default class EmployeeSessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateEmployeePROService);

    const { employee, token } = await authenticateUser.execute({
      email,
      password,
    });
    const classEmployee = classToClass(employee);

    return res.json({
      token,
      employee: classEmployee,
    });
  }
}
