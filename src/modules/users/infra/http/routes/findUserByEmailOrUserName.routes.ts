import { Router } from 'express';

import FindUserByEmailOrUserNameController from '@modules/users/infra/http/controllers/FindUserByEmailOrUserNameController';

const findUserByEmailOrUserNameRouter = Router();
const findUserByEmailOrUserNameController = new FindUserByEmailOrUserNameController();

findUserByEmailOrUserNameRouter.get(
  '/',
  findUserByEmailOrUserNameController.show,
);

export default findUserByEmailOrUserNameRouter;
