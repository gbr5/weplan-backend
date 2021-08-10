import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import EventSupplierFilesController from '@modules/suppliers/infra/http/controllers/EventSupplierFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventSupplierFilesRouter = Router();
const upload = multer(uploadConfig.multer);
const eventSupplierFilesController = new EventSupplierFilesController();

eventSupplierFilesRouter.post(
  '/:supplier_id',
  ensureAuthenticated,
  upload.single('file'),
  eventSupplierFilesController.create,
);

eventSupplierFilesRouter.get(
  '/:supplier_id',
  ensureAuthenticated,
  eventSupplierFilesController.index,
);
eventSupplierFilesRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventSupplierFilesController.delete,
);

export default eventSupplierFilesRouter;
