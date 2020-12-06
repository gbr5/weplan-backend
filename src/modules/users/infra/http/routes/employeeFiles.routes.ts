import { Router } from 'express';

import EmployeeFilesController from '@modules/users/infra/http/controllers/EmployeeFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const employeeFilesRouter = Router();
const employeeFilesController = new EmployeeFilesController();

employeeFilesRouter.post(
  '/',
  ensureAuthenticated,
  employeeFilesController.create,
);

employeeFilesRouter.get(
  '/:employee_id',
  ensureAuthenticated,
  employeeFilesController.list,
);
employeeFilesRouter.delete(
  '/:id',
  ensureAuthenticated,
  employeeFilesController.delete,
);

// employeeFilesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default employeeFilesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
