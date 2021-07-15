import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierSubCategoriesService from '@modules/suppliers/services/CreateSupplierSubCategoriesService';
import UpdateSupplierSubCategoriesService from '@modules/suppliers/services/UpdateSupplierSubCategoriesService';
import ListSupplierSubCategoriesService from '@modules/suppliers/services/ListSupplierSubCategoriesService';
import DeleteSupplierSubCategoryService from '@modules/suppliers/services/DeleteSupplierSubCategoryService';

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
    const listSupplierSubCategories = container.resolve(
      ListSupplierSubCategoriesService,
    );

    const supplierCategories = await listSupplierSubCategories.execute(
      category_name,
    );

    return res.json(supplierCategories);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { sub_category } = req.body;

    const updateSupplierSubCategories = container.resolve(
      UpdateSupplierSubCategoriesService,
    );

    const supplierCategories = await updateSupplierSubCategories.execute({
      sub_category,
      id,
    });

    return res.json(supplierCategories);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteSupplierSubCategory = container.resolve(
      DeleteSupplierSubCategoryService,
    );

    await deleteSupplierSubCategory.execute(id);

    return res.status(200).send();
  }
}
