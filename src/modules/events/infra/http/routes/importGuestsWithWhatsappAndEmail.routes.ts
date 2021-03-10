import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ImportGuestsWithWhatsappAndEmailController from '../controllers/ImportGuestsWithWhatsappAndEmailController';

const upload = multer(uploadConfig.multer);
const importGuestsWithWhatsappAndEmailRouter = Router();
const importGuestsWithWhatsappAndEmailController = new ImportGuestsWithWhatsappAndEmailController();

importGuestsWithWhatsappAndEmailRouter.use(ensureAuthenticated);

importGuestsWithWhatsappAndEmailRouter.post(
  '/:event_id/:number_of_guests_available',
  upload.single('file'),
  importGuestsWithWhatsappAndEmailController.import,
);

export default importGuestsWithWhatsappAndEmailRouter;
