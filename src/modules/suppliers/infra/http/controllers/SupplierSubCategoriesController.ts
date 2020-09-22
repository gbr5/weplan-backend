import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierSubCategoriesService from '@modules/suppliers/services/CreateSupplierSubCategoriesService';
import UpdateSupplierSubCategoriesService from '@modules/suppliers/services/UpdateSupplierSubCategoriesService';
import ListSupplierSubCategoriesService from '@modules/suppliers/services/ListSupplierSubCategoriesService';

export default class SupplierSubCategoriesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const categoryName = req.params;
    const { sub_category } = req.body;

    const createSupplierSubCategories = container.resolve(
      CreateSupplierSubCategoriesService,
    );

    const category = categoryName.category_name;

    const supplierCategories = await createSupplierSubCategories.execute(
      category,
      sub_category,
    );

    return res.json(supplierCategories);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { category_name } = reqParams;
    console.log('SubCategoryController, category_name:', category_name);
    const listSupplierSubCategories = container.resolve(
      ListSupplierSubCategoriesService,
    );

    const supplierCategories = await listSupplierSubCategories.execute(
      category_name,
    );

    return res.json(supplierCategories);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const old_subCategoryName = req.params;
    const { sub_category } = req.body;

    const updateSupplierSubCategories = container.resolve(
      UpdateSupplierSubCategoriesService,
    );

    const supplierCategories = await updateSupplierSubCategories.execute({
      sub_category,
      oldSubCategoryName: old_subCategoryName.sub_category,
    });

    return res.json(supplierCategories);
  }
}
