import { Router } from 'express';
import ShowSupplierByTrimmedNameController from '@modules/suppliers/infra/http/controllers/ShowSupplierByTrimmedNameController';

const showSupplierByTrimmedNameRouter = Router();
const showSupplierByTrimmedNameController = new ShowSupplierByTrimmedNameController();

showSupplierByTrimmedNameRouter.get(
  '/:trimmed_name',
  showSupplierByTrimmedNameController.show,
);

export default showSupplierByTrimmedNameRouter;
