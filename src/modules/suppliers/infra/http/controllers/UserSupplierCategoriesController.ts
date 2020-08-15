import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserSupplierCategoriesService from '@modules/suppliers/services/CreateUserSupplierCategoriesService';
import ShowUserSupplierCategoriesService from '@modules/suppliers/services/ShowUserSupplierCategoriesService';
import ListSuppliersByCategoryService from '@modules/suppliers/services/ListSuppliersByCategoryService';
import DeleteUserSupplierCategoriesService from '@modules/suppliers/services/DeleteUserSupplierCategoriesService';

export default class UserSupplierCategoriesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const subCategory_name = req.params;
    const user_id = req.user.id;

    const createUserSupplierCategories = container.resolve(
      CreateUserSupplierCategoriesService,
    );

    const userSupplierCategories = await createUserSupplierCategories.execute({
      sub_category_name: subCategory_name.sub_category,
      user_id,
    });

    return res.json(classToClass(userSupplierCategories));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const sub_category_name = req.params;
    const listSuppliersByCategory = container.resolve(
      ListSuppliersByCategoryService,
    );

    const userSupplierCategories = await listSuppliersByCategory.execute(
      sub_category_name.sub_category,
    );

    return res.json(classToClass(userSupplierCategories));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const supplier = req.params;

    const showUserSupplierCategories = container.resolve(
      ShowUserSupplierCategoriesService,
    );

    const userSupplierCategories = await showUserSupplierCategories.execute({
      sub_category_name: supplier.sub_category,
      user_id: supplier.user_id,
    });

    return res.json(classToClass(userSupplierCategories));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const sub_category_name = req.params;
    const user_id = req.user.id;

    const deleteUserSupplierCategories = container.resolve(
      DeleteUserSupplierCategoriesService,
    );

    await deleteUserSupplierCategories.execute({
      user_id,
      sub_category_name: sub_category_name.sub_category,
    });

    return res.status(200).send();
  }
}
