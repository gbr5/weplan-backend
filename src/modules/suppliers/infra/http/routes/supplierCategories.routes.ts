import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SupplierCategoriesController from '@modules/suppliers/infra/http/controllers/SupplierCategoriesController';
import SupplierSubCategoriesController from '@modules/suppliers/infra/http/controllers/SupplierSubCategoriesController';
import UserSupplierCategoriesController from '@modules/suppliers/infra/http/controllers/UserSupplierCategoriesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const supplierCategoriessRouter = Router();
const supplierCategoriessController = new SupplierCategoriesController();
const userSupplierCategoriesController = new UserSupplierCategoriesController();
const supplierSubCategoriesController = new SupplierSubCategoriesController();

supplierCategoriessRouter.use(ensureAuthenticated);

supplierCategoriessRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      category: Joi.string().required(),
    },
  }),
  supplierCategoriessController.create,
);

supplierCategoriessRouter.get('/', supplierCategoriessController.index);

supplierCategoriessRouter.put(
  '/:category',
  celebrate({
    [Segments.BODY]: {
      category: Joi.string().required(),
    },
  }),
  supplierCategoriessController.update,
);

supplierCategoriessRouter.post(
  '/:category_name',
  celebrate({
    [Segments.BODY]: {
      sub_category: Joi.string().required(),
    },
  }),
  supplierSubCategoriesController.create,
);

supplierCategoriessRouter.get(
  '/:category_name',
  supplierSubCategoriesController.index,
);

supplierCategoriessRouter.put(
  '/:category_name/:sub_category',
  celebrate({
    [Segments.BODY]: {
      sub_category: Joi.string().required(),
    },
  }),
  supplierSubCategoriesController.update,
);

supplierCategoriessRouter.post(
  '/:category_name/:sub_category',
  userSupplierCategoriesController.create,
);

supplierCategoriessRouter.get(
  '/:category_name/:sub_category',
  userSupplierCategoriesController.index,
);

supplierCategoriessRouter.get(
  '/:category_name/:sub_category/:user_id',
  userSupplierCategoriesController.show,
);

supplierCategoriessRouter.delete(
  '/:category_name/:sub_category',
  userSupplierCategoriesController.delete,
);

export default supplierCategoriessRouter;
