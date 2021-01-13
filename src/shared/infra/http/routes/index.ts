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
import cardCustomerServiceOrdersRouter from '@modules/suppliers/infra/http/routes/cardCustomerServiceOrders.routes';
import cardBudgetsRouter from '@modules/suppliers/infra/http/routes/cardBudgets.routes';
import customerServiceOrdersRouter from '@modules/suppliers/infra/http/routes/customerServiceOrders.routes';
import companyDefaultServiceOrderFieldsRouter from '@modules/suppliers/infra/http/routes/companyDefaultServiceOrderFields.routes';
import customerServiceOrderFieldAnswersRouter from '@modules/suppliers/infra/http/routes/customerServiceOrderFieldAnswers.routes';
import eventServiceOrdersRouter from '@modules/events/infra/http/routes/eventServiceOrders.routes';
import cardOutsideParticipantsRouter from '@modules/suppliers/infra/http/routes/cardOutsideParticipants.routes';
import userFilesRouter from '@modules/users/infra/http/routes/userFiles.routes';
import userFileCategoriesRouter from '@modules/users/infra/http/routes/userFileCategories.routes';
import categoryFilesRouter from '@modules/users/infra/http/routes/categoryFiles.routes';
import contactFilesRouter from '@modules/users/infra/http/routes/contactFiles.routes';
import cardFilesRouter from '@modules/users/infra/http/routes/cardFiles.routes';
import budgetFilesRouter from '@modules/users/infra/http/routes/budgetFiles.routes';
import employeeFilesRouter from '@modules/users/infra/http/routes/employeeFiles.routes';
import eventNotesRouter from '@modules/events/infra/http/routes/eventNotes.routes';
import eventUserSupplierNotesRouter from '@modules/events/infra/http/routes/eventUserSupplierNotes.routes';
import weplanGuestsRouter from '@modules/events/infra/http/routes/weplanGuests.routes';
import nextEventRouter from '@modules/events/infra/http/routes/nextEvent.routes';
import listEventsRouter from '@modules/events/infra/http/routes/listEvents.routes';
import eventNumberOfGuestsRouter from '@modules/events/infra/http/routes/eventNumberOfGuests.routes';
import eventOwnerNumberOfGuestsRouter from '@modules/events/infra/http/routes/eventOwnerNumberOfGuests.routes';
import eventMemberNumberOfGuestsRouter from '@modules/events/infra/http/routes/eventMemberNumberOfGuests.routes';
import mainTransactionRouter from '@modules/transactions/infra/http/routes/mainTransactions.routes';
import eventTransactionRouter from '@modules/transactions/infra/http/routes/eventTransactions.routes';
import eventSupplierMainTransactionRouter from '@modules/transactions/infra/http/routes/eventSupplierMainTransactions.routes';
import eventOwnerPaymentTransactionRouter from '@modules/transactions/infra/http/routes/eventOwnerPaymentTransactions.routes';
import eventMemberPaymentTransactionRouter from '@modules/transactions/infra/http/routes/eventMemberPaymentTransactions.routes';
import eventOwnerPaymentRouter from '@modules/transactions/infra/http/routes/eventOwnerPayments.routes';
import eventMemberPaymentRouter from '@modules/transactions/infra/http/routes/eventMemberPayments.routes';
import userTransactionRouter from '@modules/transactions/infra/http/routes/userTransactions.routes';
import guestContactInfosRouter from '@modules/events/infra/http/routes/guestContactInfos.routes';
import guestsRouter from '@modules/events/infra/http/routes/guests.routes';
import userConfirmationFilesRouter from '@modules/events/infra/http/routes/userConfirmationFiles.routes';
import wpGuestConfirmationsRouter from '@modules/users/infra/http/controllers/wpGuestConfirmationsRouter';
import eventInvitationsRouter from '@modules/users/infra/http/routes/eventInvitations.routes';
import weplanGuestMessagesRouter from '@modules/users/infra/http/routes/weplanGuestMessages.routes';
import eventDatesRouter from '@modules/events/infra/http/routes/eventDates.routes';
import userProfileRouter from '@modules/users/infra/http/routes/userProfile.routes';
import eventFilesRouter from '@modules/events/infra/http/routes/eventFiles.routes';
import userImagesRouter from '@modules/users/infra/http/routes/userImages.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.use('/users', usersRouter);
routes.use('/event-guests', guestsRouter);
routes.use('/event/dates', eventDatesRouter);
routes.use('/user/modules', userManagementModulesRouter);
routes.use('/user/confirmations', userConfirmationsRouter);
routes.use('/wp-guest/confirmations', wpGuestConfirmationsRouter);
routes.use('/user/confirmation-files', userConfirmationFilesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/user-profile', userProfileRouter);
routes.use('/company-info', companyInfoRouter);
routes.use('/guest-contact-info', guestContactInfosRouter);
routes.use('/person-info', personInfoRouter);
routes.use('/user-birthdate', userBirthdateRouter);
routes.use('/contact-types', contactTypesRouter);

routes.use('/weplan-guest-messages', weplanGuestMessagesRouter);

routes.use('/user/images', userImagesRouter);

routes.use('/user/files', userFilesRouter);
routes.use('/user/file/categories', userFileCategoriesRouter);
routes.use('/category/files', categoryFilesRouter);
routes.use('/contact/files', contactFilesRouter);
routes.use('/card/files', cardFilesRouter);
routes.use('/budget/files', budgetFilesRouter);
routes.use('/employee/files', employeeFilesRouter);

routes.use('/my-next-event', nextEventRouter);
routes.use('/list/events', listEventsRouter);
routes.use('/events', eventsRouter);
routes.use('/event/weplan-guests', weplanGuestsRouter);
routes.use('/event/number-of-guests', eventNumberOfGuestsRouter);
routes.use('/owner/number-of-guests', eventOwnerNumberOfGuestsRouter);
routes.use('/member/number-of-guests', eventMemberNumberOfGuestsRouter);
routes.use('/event/notes', eventNotesRouter);
routes.use('/event/files', eventFilesRouter);
routes.use('/event/invitations', eventInvitationsRouter);
routes.use('/event/user/supplier-notes', eventUserSupplierNotesRouter);
routes.use('/event/service-orders', eventServiceOrdersRouter);
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
routes.use('/card/outside-participants', cardOutsideParticipantsRouter);
routes.use('/card/customers', cardCustomersRouter);
routes.use('/card/customer-service-orders', cardCustomerServiceOrdersRouter);
routes.use('/card/budgets', cardBudgetsRouter);
routes.use('/company/contacts/', companyContactsRouter);
routes.use('/company/contact/wp-user/', companyContactWeplanUsersRouter);
routes.use('/service-order/customer', customerServiceOrdersRouter);
routes.use(
  '/company/customer-service-order/default-fields',
  companyDefaultServiceOrderFieldsRouter,
);
routes.use(
  '/company/customer-service-order/answers',
  customerServiceOrderFieldAnswersRouter,
);

// Default funnel-card info-field
routes.use('/comercial/funnel', comercialFunnelDefaultInfoFieldsRouter);
routes.use('/production/funnel', productionFunnelDefaultInfoFieldsRouter);
routes.use('/projects/funnel', projectsFunnelDefaultInfoFieldsRouter);
routes.use('/financial/funnel', financialFunnelDefaultInfoFieldsRouter);

routes.use('/finances', financesRouter);
routes.use('/check-lists', checkListRouter);
routes.use('/card/check-lists', cardCheckListRouter);

// Main Transactions
routes.use('/main-transactions', mainTransactionRouter);

// Event Transactions
routes.use('/user-transactions', userTransactionRouter);

// Event Transactions
routes.use('/event-transactions', eventTransactionRouter);

// Event Supplier Main Transactions
routes.use(
  '/event-supplier-main-transactions',
  eventSupplierMainTransactionRouter,
);

// Event Owner Payments
routes.use('/event-owner-payments', eventOwnerPaymentRouter);

// Event Member Payments
routes.use('/event-member-payments', eventMemberPaymentRouter);

// Event Owner Payment Transactions
routes.use(
  '/event-owner-payment-transactions',
  eventOwnerPaymentTransactionRouter,
);

// Event Member Payment Transactions
routes.use(
  '/event-member-payment-transactions',
  eventMemberPaymentTransactionRouter,
);

export default routes;
