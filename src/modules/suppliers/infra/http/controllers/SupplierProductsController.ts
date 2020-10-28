import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSupplierProductService from '@modules/suppliers/services/CreateSupplierProductService';
import ListSupplierProductsService from '@modules/suppliers/services/ListSupplierProductsService';
import DeleteSupplierProductService from '@modules/suppliers/services/DeleteSupplierProductService';

export default class SupplierProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { company_id } = reqParams;
    const { sub_category_id, event_type_id, price } = req.body;

    const createSupplierProduct = container.resolve(
      CreateSupplierProductService,
    );

    const supplierProduct = await createSupplierProduct.execute({
      user_id: company_id,
      sub_category_id,
      event_type_id,
      price,
    });

    return res.json(classToClass(supplierProduct));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;

    const listProductsBySupplier = container.resolve(
      ListSupplierProductsService,
    );

    const supplierProducts = await listProductsBySupplier.execute(user_id);

    return res.json(classToClass(supplierProducts));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteSupplierProduct = container.resolve(
      DeleteSupplierProductService,
    );

    await deleteSupplierProduct.execute(id);

    return res.status(200).send();
  }
}
