import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CheckListController from '@modules/checklists/infra/http/controllers/CheckListsController';
import CheckListTaskController from '@modules/checklists/infra/http/controllers/CheckListTasksController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CompanyUserEmployeeTasksController from '../controllers/CompanyUserEmployeeTasksController';

const checkListRouter = Router();
const checkListController = new CheckListController();
const checkListTaskController = new CheckListTaskController();
const companyUserEmployeeTasksController = new CompanyUserEmployeeTasksController();

checkListRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      name: Joi.string().required(),
      color: Joi.string().required(),
      isActive: Joi.boolean().required(),
      priority: Joi.string().required(),
      due_date: Joi.string().required(),
    },
  }),
  checkListController.create,
);
checkListRouter.get(
  '/:user_id',
  ensureAuthenticated,
  checkListController.index,
);
checkListRouter.put(
  '/edit/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      color: Joi.string().required(),
      isActive: Joi.boolean().required(),
      priority: Joi.string().required(),
      due_date: Joi.string().required(),
    },
  }),
  checkListController.update,
);

// ==> ==> Tasks
checkListRouter.post(
  '/tasks/:check_list_id',
  celebrate({
    [Segments.BODY]: {
      owner_id: Joi.string().required(),
      task: Joi.string().required(),
      color: Joi.string().required(),
      isActive: Joi.boolean().required(),
      priority: Joi.string().required(),
      status: Joi.string().required(),
      due_date: Joi.string().required(),
    },
  }),
  checkListTaskController.create,
);
checkListRouter.get(
  '/tasks/:check_list_id',
  ensureAuthenticated,
  checkListTaskController.index,
);
checkListRouter.get(
  '/tasks/:company_id/:owner_id',
  ensureAuthenticated,
  companyUserEmployeeTasksController.index,
);
checkListRouter.put(
  '/tasks/edit/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      task: Joi.string().required(),
      status: Joi.string().required(),
      color: Joi.string().required(),
      isActive: Joi.boolean().required(),
      priority: Joi.string().required(),
      due_date: Joi.string().required(),
    },
  }),
  checkListTaskController.update,
);
checkListRouter.put(
  '/tasks/edit/is-active/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      isActive: Joi.boolean().required(),
    },
  }),
  checkListTaskController.updateIsActive,
);
checkListRouter.put(
  '/tasks/edit/status/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required(),
    },
  }),
  checkListTaskController.updateStatus,
);
checkListRouter.put(
  '/tasks/edit/priority/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      priority: Joi.string().required(),
    },
  }),
  checkListTaskController.updatePriority,
);

export default checkListRouter;
