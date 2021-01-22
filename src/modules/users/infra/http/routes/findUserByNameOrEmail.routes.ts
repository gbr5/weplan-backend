import { Router } from 'express';

import FindByNameOrEmailController from '@modules/users/infra/http/controllers/FindByNameOrEmailController';

const findUserByNameOrEmailRouter = Router();
const findByNameOrEmailController = new FindByNameOrEmailController();

findUserByNameOrEmailRouter.get('/', findByNameOrEmailController.show);

export default findUserByNameOrEmailRouter;
