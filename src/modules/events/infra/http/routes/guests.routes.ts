import { Router } from 'express';

import GuestConfirmationController from '@modules/events/infra/http/controllers/GuestConfirmationController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import uploadConfig from '@config/upload';
import multer from 'multer';
import GuestsController from '../controllers/GuestsController';

const guestsRouter = Router();
const guestsController = new GuestsController();
const guestConfirmationController = new GuestConfirmationController();
const upload = multer(uploadConfig.multer);

guestsRouter.use(ensureAuthenticated);

guestsRouter.get('/:id', guestsController.show);

guestsRouter.post(
  '/:event_id',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string(),
      description: Joi.string(),
      confirmed: Joi.boolean().required(),
      weplanUser: Joi.boolean().required(),
      user_id: Joi.string(),
    },
  }),
  guestsController.create,
);
guestsRouter.delete('/:id', guestsController.delete);
guestsRouter.get('/list/:event_id/', guestsController.index);

guestsRouter.put('/:id', guestsController.update);
guestsRouter.put('/confirmation/:id', guestConfirmationController.update);

guestsRouter.post(
  '/:event_id/import/:number_of_guests_available',
  upload.single('file'),
  guestsController.import,
);

export default guestsRouter;
