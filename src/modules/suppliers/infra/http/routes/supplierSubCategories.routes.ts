import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SupplierSubCategoriesController from '@modules/suppliers/infra/http/controllers/SupplierSubCategoriesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const supplierSubCategoriesRouter = Router();
const supplierSubCategoriesController = new SupplierSubCategoriesController();

supplierSubCategoriesRouter.use(ensureAuthenticated);

supplierSubCategoriesRouter.post(
  '/:category_name',
  celebrate({
    [Segments.BODY]: {
      sub_category: Joi.string().required(),
    },
  }),
  supplierSubCategoriesController.create,
);

supplierSubCategoriesRouter.get(
  '/:category_name',
  supplierSubCategoriesController.index,
);

supplierSubCategoriesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      sub_category: Joi.string().required(),
    },
  }),
  supplierSubCategoriesController.update,
);

supplierSubCategoriesRouter.delete(
  '/:id',
  supplierSubCategoriesController.delete,
);

export default supplierSubCategoriesRouter;
