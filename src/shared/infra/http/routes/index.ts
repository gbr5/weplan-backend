import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import companyInfoRouter from '@modules/users/infra/http/routes/companyInfo.routes';
import personInfoRouter from '@modules/users/infra/http/routes/personInfo.routes';
import userBirthdateRouter from '@modules/users/infra/http/routes/userBirthdate.routes';
import eventsRouter from '@modules/events/infra/http/routes/events.routes';

import eventTypesRouter from '@modules/events/infra/http/routes/eventTypes.routes';
import eventTypeSuppliersRouter from '@modules/events/infra/http/routes/eventTypeSuppliers.routes';
import eventSuppliersRouter from '@modules/events/infra/http/routes/eventSuppliers.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/company-info', companyInfoRouter);
routes.use('/person-info', personInfoRouter);
routes.use('/user-birthdate', userBirthdateRouter);

routes.use('/events', eventsRouter);
routes.use('/event-types', eventTypesRouter);
routes.use('/suppliers', eventTypeSuppliersRouter);

routes.use('/event-suppliers/', eventSuppliersRouter);

export default routes;
