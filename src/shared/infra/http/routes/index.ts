import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userConfirmationsRouter from '@modules/users/infra/http/routes/userConfirmations.routes';
import userManagementModulesRouter from '@modules/users/infra/http/routes/userManagementModules.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import companyInfoRouter from '@modules/users/infra/http/routes/companyInfo.routes';
import personInfoRouter from '@modules/users/infra/http/routes/personInfo.routes';
import userBirthdateRouter from '@modules/users/infra/http/routes/userBirthdate.routes';
import contactTypesRouter from '@modules/users/infra/http/routes/contactTypes.routes';

import eventsRouter from '@modules/events/infra/http/routes/events.routes';
import eventTypesRouter from '@modules/events/infra/http/routes/eventTypes.routes';
import friendsEventsRouter from '@modules/events/infra/http/routes/friendsEvents.routes';

import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.routes';
import companyEmployeesRouter from '@modules/suppliers/infra/http/routes/companyEmployees.routes';
import supplierCategoriesRouter from '@modules/suppliers/infra/http/routes/supplierCategories.routes';
import funnelTypesRouter from '@modules/suppliers/infra/http/routes/funnelTypes.routes';
import supplierFunnelsRouter from '@modules/suppliers/infra/http/routes/supplierFunnels.routes';
import cardsRouter from '@modules/suppliers/infra/http/routes/cards.routes';
import companyContactsRouter from '@modules/suppliers/infra/http/routes/companyContacts.routes';
import financialFunnelDefaultInfoFieldsRouter from '@modules/suppliers/infra/http/routes/financialFunnelDefaultInfoFields.routes';
import comercialFunnelDefaultInfoFieldsRouter from '@modules/suppliers/infra/http/routes/comercialFunnelDefaultInfoFields.routes';
import productionFunnelDefaultInfoFieldsRouter from '@modules/suppliers/infra/http/routes/productionFunnelDefaultInfoFields.routes';
import projectsFunnelDefaultInfoFieldsRouter from '@modules/suppliers/infra/http/routes/projectsFunnelDefaultInfoFields.routes';
import weplanManagementModulesRouter from '@modules/weplan/infra/http/routes/weplanManagementModules.routes';
import weplanProductsRouter from '@modules/weplan/infra/http/routes/weplanProducts.routes';
import weplanContractOrdersRouter from '@modules/weplan/infra/http/routes/weplanContractOrders.routes';

import financesRouter from '@modules/finances/infra/http/routes/finances.routes';

import checkListRouter from '@modules/checklists/infra/http/routes/checkList.routes';
import cardCheckListRouter from '@modules/checklists/infra/http/routes/cardCheckList.routes';
import cardParticipantsRouter from '@modules/suppliers/infra/http/routes/cardParticipants.routes';
import companyContactWeplanUsersRouter from '@modules/suppliers/infra/http/routes/companyContactWeplanUsers.routes';
import cardCustomersRouter from '@modules/suppliers/infra/http/routes/cardCustomers.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.use('/users', usersRouter);
routes.use('/user/modules', userManagementModulesRouter);
routes.use('/user/confirmations', userConfirmationsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/company-info', companyInfoRouter);
routes.use('/person-info', personInfoRouter);
routes.use('/user-birthdate', userBirthdateRouter);
routes.use('/contact-types', contactTypesRouter);

routes.use('/events', eventsRouter);
routes.use('/event-types', eventTypesRouter);
routes.use('/friends-events', friendsEventsRouter);

routes.use('/suppliers', suppliersRouter);
routes.use('/supplier-employees', companyEmployeesRouter);
routes.use('/suppliers/categories', supplierCategoriesRouter);
routes.use('/wp-products', weplanProductsRouter);
routes.use('/wp/contract-orders', weplanContractOrdersRouter);
routes.use('/wp-management-modules', weplanManagementModulesRouter);
routes.use('/funnel-types', funnelTypesRouter);
routes.use('/funnels', supplierFunnelsRouter);
routes.use('/cards', cardsRouter);
routes.use('/card/participants', cardParticipantsRouter);
routes.use('/card/customers', cardCustomersRouter);
routes.use('/company/contacts/', companyContactsRouter);
routes.use('/company/contact/wp-user/', companyContactWeplanUsersRouter);

// Default funnel-card info-field
routes.use('/comercial/funnel', comercialFunnelDefaultInfoFieldsRouter);
routes.use('/production/funnel', productionFunnelDefaultInfoFieldsRouter);
routes.use('/projects/funnel', projectsFunnelDefaultInfoFieldsRouter);
routes.use('/financial/funnel', financialFunnelDefaultInfoFieldsRouter);

routes.use('/finances', financesRouter);
routes.use('/check-lists', checkListRouter);
routes.use('/card/check-lists', cardCheckListRouter);

export default routes;
