import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SupplierCategoriesController from '@modules/suppliers/infra/http/controllers/SupplierCategoriesController';
import SupplierSubCategoriesController from '@modules/suppliers/infra/http/controllers/SupplierSubCategoriesController';
import UserSupplierCategoriesController from '@modules/suppliers/infra/http/controllers/UserSupplierCategoriesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const supplierCategoriesRouter = Router();
const supplierCategoriesController = new SupplierCategoriesController();
const userSupplierCategoriesController = new UserSupplierCategoriesController();
const supplierSubCategoriesController = new SupplierSubCategoriesController();

supplierCategoriesRouter.use(ensureAuthenticated);

// =============== !!! ==> http.../suppliers/categories  <== ===============

// === $$ === $ ==> Supplier <== $ === $$ === //

supplierCategoriesRouter.post(
  '/weplan/:sub_category_name/:company_id',
  userSupplierCategoriesController.create,
);

supplierCategoriesRouter.get(
  '/list-weplan/:category_name/:sub_category',
  userSupplierCategoriesController.index,
);

supplierCategoriesRouter.get(
  '/weplan/:category_name/:sub_category/:user_id',
  userSupplierCategoriesController.show,
);

supplierCategoriesRouter.delete(
  '/weplan/:category_name/:sub_category',
  userSupplierCategoriesController.delete,
);

// === Supplier Categories === //

supplierCategoriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      category: Joi.string().required(),
    },
  }),
  supplierCategoriesController.create,
);

supplierCategoriesRouter.get('/all', supplierCategoriesController.index);

supplierCategoriesRouter.put(
  '/:category',
  celebrate({
    [Segments.BODY]: {
      category: Joi.string().required(),
    },
  }),
  supplierCategoriesController.update,
);

// === Supplier Sub Categories === //

supplierCategoriesRouter.post(
  '/:category_name',
  celebrate({
    [Segments.BODY]: {
      sub_category: Joi.string().required(),
    },
  }),
  supplierSubCategoriesController.create,
);

supplierCategoriesRouter.get(
  '/sub-categories/:category_name',
  supplierSubCategoriesController.index,
);

supplierCategoriesRouter.put(
  '/:category_name/:sub_category',
  celebrate({
    [Segments.BODY]: {
      sub_category: Joi.string().required(),
    },
  }),
  supplierSubCategoriesController.update,
);

export default supplierCategoriesRouter;
