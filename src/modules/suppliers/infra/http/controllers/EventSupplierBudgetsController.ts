import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierBudgetService from '@modules/suppliers/services/CreateEventSupplierBudgetService';
import UpdateEventSupplierBudgetService from '@modules/suppliers/services/UpdateEventSupplierBudgetService';
import DeleteEventSupplierBudgetService from '@modules/suppliers/services/DeleteEventSupplierBudgetService';
import ListEventSupplierBudgetsService from '@modules/suppliers/services/ListEventSupplierBudgetsService';

export default class EventSuppliersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { supplier_id, amount, isActive, description, due_date } = req.body;

    const createEventSupplierBudget = container.resolve(
      CreateEventSupplierBudgetService,
    );

    const supplier = await createEventSupplierBudget.execute({
      supplier_id,
      amount,
      isActive,
      description,
      due_date,
    });

    return res.json(classToClass(supplier));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, amount, isActive, description, due_date } = req.body;

    const updateEventSupplierBudget = container.resolve(
      UpdateEventSupplierBudgetService,
    );

    const supplier = await updateEventSupplierBudget.execute({
      id,
      amount,
      isActive,
      description,
      due_date,
    });

    return res.json(classToClass(supplier));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { supplier_id } = reqParams;

    const listEventSuppliersBudget = container.resolve(
      ListEventSupplierBudgetsService,
    );

    const files = await listEventSuppliersBudget.execute(supplier_id);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventSupplierBudget = container.resolve(
      DeleteEventSupplierBudgetService,
    );

    await deleteEventSupplierBudget.execute(id);

    return res.status(200).send();
  }
}
