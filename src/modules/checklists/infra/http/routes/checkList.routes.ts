import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CheckListController from '@modules/checklists/infra/http/controllers/CheckListsController';
import CheckListTaskController from '@modules/checklists/infra/http/controllers/CheckListTasksController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const checkListRouter = Router();
const checkListController = new CheckListController();
const checkListTaskController = new CheckListTaskController();

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

export default checkListRouter;
