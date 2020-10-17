import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyEmployeeService from '@modules/suppliers/services/CreateCompanyEmployeeService';
import ListCompanyEmployeesService from '@modules/suppliers/services/ListCompanyEmployeesService';
import ShowCompanyEmployeeService from '@modules/suppliers/services/ShowCompanyEmployeeService';
import DeleteCompanyEmployeeService from '@modules/suppliers/services/DeleteCompanyEmployeeService';

export default class CompanyEmployeesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { employee_id } = reqParams;
    const company_id = req.user.id;
    const { position, modules } = req.body;

    const createCompanyEmployees = container.resolve(
      CreateCompanyEmployeeService,
    );

    const employee = await createCompanyEmployees.execute({
      employee_id,
      company_id,
      position,
      modules,
    });

    return res.json(classToClass(employee));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_id } = reqParams;
    console.log('company_id', company_id);
    const listCompanyEmployees = container.resolve(ListCompanyEmployeesService);

    const employees = await listCompanyEmployees.execute(company_id);

    return res.json(classToClass(employees));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { employee_id } = reqParams;
    const showCompanyEmployee = container.resolve(ShowCompanyEmployeeService);

    const employee = await showCompanyEmployee.execute(employee_id);

    return res.json(classToClass(employee));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCompanyEmployees = container.resolve(
      DeleteCompanyEmployeeService,
    );

    await deleteCompanyEmployees.execute(id);

    return res.status(200).send();
  }
}
