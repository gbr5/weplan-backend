import { Router } from 'express';

import FindCompanyInfoByNameController from '@modules/users/infra/http/controllers/FindCompanyInfoByNameController';

const findCompanyInfoByNameRouter = Router();
const findCompanyInfoByNameController = new FindCompanyInfoByNameController();

findCompanyInfoByNameRouter.get('/:name', findCompanyInfoByNameController.show);

export default findCompanyInfoByNameRouter;
