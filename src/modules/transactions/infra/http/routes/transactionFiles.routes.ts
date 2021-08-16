import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import TransactionFilesController from '@modules/transactions/infra/http/controllers/TransactionFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const transactionFilesRouter = Router();
const upload = multer(uploadConfig.multer);
const transactionFilesController = new TransactionFilesController();

transactionFilesRouter.post(
  '/:transaction_id',
  ensureAuthenticated,
  upload.single('file'),
  transactionFilesController.create,
);

transactionFilesRouter.put(
  '/:id',
  ensureAuthenticated,
  transactionFilesController.update,
);
transactionFilesRouter.get(
  '/:transaction_id',
  ensureAuthenticated,
  transactionFilesController.index,
);
transactionFilesRouter.delete(
  '/:id',
  ensureAuthenticated,
  transactionFilesController.delete,
);

export default transactionFilesRouter;
