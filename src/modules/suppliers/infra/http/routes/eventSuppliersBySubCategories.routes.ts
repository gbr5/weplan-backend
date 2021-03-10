import { Router } from 'express';
import UserSupplierCategoriesController from '@modules/suppliers/infra/http/controllers/UserSupplierCategoriesController';

const eventSuppliersBySubCategoriesRouter = Router();
const eventSuppliersBySubCategoriesController = new UserSupplierCategoriesController();

eventSuppliersBySubCategoriesRouter.get(
  '/:sub_category_name',
  eventSuppliersBySubCategoriesController.index,
);

export default eventSuppliersBySubCategoriesRouter;
