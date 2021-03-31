import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EmployeeSessionsController from '@modules/users/infra/http/controllers/EmployeeSessionsController';

const employeeSessionsRouter = Router();
const employeeSessionsController = new EmployeeSessionsController();
// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta

employeeSessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  employeeSessionsController.create,
);

export default employeeSessionsRouter;
