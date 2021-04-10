import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyEmployeeService from '@modules/suppliers/services/CreateCompanyEmployeeService';
import ListCompanyEmployeesService from '@modules/suppliers/services/ListCompanyEmployeesService';
import ShowCompanyEmployeeService from '@modules/suppliers/services/ShowCompanyEmployeeService';
import DeleteCompanyEmployeeService from '@modules/suppliers/services/DeleteCompanyEmployeeService';
import ListUserAsEmployeeService from '@modules/suppliers/services/ListUserAsEmployeeService';
import UpdateCompanyEmployeesService from '@modules/suppliers/services/UpdateCompanyEmployeeService';
import UpdateCompanyEmployeeAccessKeyService from '@modules/suppliers/services/UpdateCompanyEmployeeAccessKeyService';
import UpdateCompanyEmployeePasswordService from '@modules/suppliers/services/UpdateCompanyEmployeePasswordService';

export default class CompanyEmployeesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { employee_id, company_id } = reqParams;
    const { access_key, password, email, title, message, position } = req.body;

    const createCompanyEmployees = container.resolve(
      CreateCompanyEmployeeService,
    );

    const employee = await createCompanyEmployees.execute({
      access_key,
      password,
      title,
      email,
      message,
      employee_id,
      company_id,
      sender_id: company_id,
      position,
    });

    return res.json(classToClass(employee));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const user_name = req.query.name;
    const employee_name = String(user_name);
    const reqParams = req.params;
    const { company_id } = reqParams;
    const listCompanyEmployees = container.resolve(ListCompanyEmployeesService);

    const employees = await listCompanyEmployees.execute(company_id);

    const sortedEmployees = employees.filter(employee =>
      employee.employeeUser.name.includes(employee_name),
    );

    if (sortedEmployees.length > 0) {
      return res.json(classToClass(sortedEmployees));
    }

    return res.json(classToClass(employees));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { position, email, isActive } = req.body;
    const updateCompanyEmployee = container.resolve(
      UpdateCompanyEmployeesService,
    );

    const employee = await updateCompanyEmployee.execute({
      id,
      position,
      email,
      isActive,
    });

    return res.json(classToClass(employee));
  }

  public async updateAccessKey(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { access_key } = req.body;
    const updateCompanyEmployeeAccessKey = container.resolve(
      UpdateCompanyEmployeeAccessKeyService,
    );

    const employee = await updateCompanyEmployeeAccessKey.execute({
      id,
      access_key,
    });

    return res.json(classToClass(employee));
  }

  public async updatePassword(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { password } = req.body;
    const updateCompanyEmployeePassword = container.resolve(
      UpdateCompanyEmployeePasswordService,
    );

    const employee = await updateCompanyEmployeePassword.execute({
      id,
      password,
    });

    return res.json(classToClass(employee));
  }

  public async listUserEmployee(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqParams = req.params;
    const { employee_id } = reqParams;
    const listUserAsEmployeeService = container.resolve(
      ListUserAsEmployeeService,
    );

    const employees = await listUserAsEmployeeService.execute(employee_id);

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
