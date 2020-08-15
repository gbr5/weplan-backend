import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSupplierCategoriesService from '@modules/suppliers/services/CreateSupplierCategoriesService';
import UpdateSupplierCategoriesService from '@modules/suppliers/services/UpdateSupplierCategoriesService';
import ListSupplierCategoriesService from '@modules/suppliers/services/ListSupplierCategoriesService';

export default class SupplierCategoriesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { category } = req.body;

    const createSupplierCategories = container.resolve(
      CreateSupplierCategoriesService,
    );

    const supplierCategories = await createSupplierCategories.execute(category);

    return res.json(classToClass(supplierCategories));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listSupplierCategories = container.resolve(
      ListSupplierCategoriesService,
    );

    const supplierCategories = await listSupplierCategories.execute();

    return res.json(classToClass(supplierCategories));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const oldCategoryName = req.params;
    const { category } = req.body;

    const updateSupplierCategories = container.resolve(
      UpdateSupplierCategoriesService,
    );

    const supplierCategories = await updateSupplierCategories.execute({
      category,
      oldCategoryName: oldCategoryName.category,
    });

    return res.json(classToClass(supplierCategories));
  }
}
