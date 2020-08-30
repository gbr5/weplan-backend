import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowSupplierService from '@modules/suppliers/services/ShowSupplierService';

export default class UserSupplierCategoriesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { supplier_id } = dataParams;

    const showSupplier = container.resolve(ShowSupplierService);

    const supplier = await showSupplier.execute(supplier_id);

    return res.json(classToClass(supplier));
  }
}
