import { Router } from 'express';

import ContactPageCampaignsController from '@modules/contactPages/infra/http/controllers/ContactPageCampaignsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const contactPageCampaignsRouter = Router();
const contactPageCampaignsController = new ContactPageCampaignsController();

contactPageCampaignsRouter.use(ensureAuthenticated);

contactPageCampaignsRouter.post('/', contactPageCampaignsController.create);
contactPageCampaignsRouter.put('/:id', contactPageCampaignsController.update);
contactPageCampaignsRouter.delete(
  '/:id',
  contactPageCampaignsController.delete,
);

export default contactPageCampaignsRouter;
