import { Router } from 'express';

import SupplierSubCategoriesController from '@modules/suppliers/infra/http/controllers/SupplierSubCategoriesController';

const eventSupplierSubCategoriesRouter = Router();
const supplierSubCategoriesController = new SupplierSubCategoriesController();

eventSupplierSubCategoriesRouter.get(
  '/:category_name',
  supplierSubCategoriesController.index,
);

export default eventSupplierSubCategoriesRouter;
