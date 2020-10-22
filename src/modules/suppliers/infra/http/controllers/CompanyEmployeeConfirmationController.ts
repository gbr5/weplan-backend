import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyEmployeeConfirmationService from '@modules/suppliers/services/CreateCompanyEmployeeConfirmationService';
import UpdateCompanyEmployeeConfirmationService from '@modules/suppliers/services/UpdateCompanyEmployeeConfirmationService';
import ShowCompanyEmployeeConfirmationService from '@modules/suppliers/services/ShowCompanyEmployeeConfirmationService';
import DeleteCompanyEmployeeConfirmationService from '@modules/suppliers/services/DeleteCompanyEmployeeConfirmationService';

export default class CompanyEmployeeConfirmationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_employee_id } = reqParams;
    const { request_message, isConfirmed, salary } = req.body;

    const createCompanyEmployeeConfirmation = container.resolve(
      CreateCompanyEmployeeConfirmationService,
    );

    const employee = await createCompanyEmployeeConfirmation.execute({
      company_employee_id,
      request_message,
      isConfirmed,
      salary,
    });

    return res.json(classToClass(employee));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { request_message, isConfirmed, salary } = req.body;

    const updateCompanyEmployeeConfirmation = container.resolve(
      UpdateCompanyEmployeeConfirmationService,
    );

    const employee = await updateCompanyEmployeeConfirmation.execute({
      id,
      request_message,
      isConfirmed,
      salary,
    });

    return res.json(classToClass(employee));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_employee_id } = reqParams;
    const showCompanyEmployeeConfirmation = container.resolve(
      ShowCompanyEmployeeConfirmationService,
    );

    const employee = await showCompanyEmployeeConfirmation.execute(
      company_employee_id,
    );

    return res.json(classToClass(employee));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCompanyEmployeeConfirmation = container.resolve(
      DeleteCompanyEmployeeConfirmationService,
    );

    await deleteCompanyEmployeeConfirmation.execute(id);

    return res.status(200).send();
  }
}
