import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import activationUserRouter from '@modules/users/infra/http/routes/activationUser.routes';
import deleteUserRouter from '@modules/users/infra/http/routes/deleteUser.routes';
import terminateUserRouter from '@modules/users/infra/http/routes/terminateUser.routes';
import userConfirmationsRouter from '@modules/users/infra/http/routes/userConfirmations.routes';
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
import checkListCardsRouter from '@modules/checklists/infra/http/routes/checkListCards.routes';
import cardCheckListRouter from '@modules/checklists/infra/http/routes/cardCheckList.routes';
import cardParticipantsRouter from '@modules/suppliers/infra/http/routes/cardParticipants.routes';
import companyContactWeplanUsersRouter from '@modules/suppliers/infra/http/routes/companyContactWeplanUsers.routes';
import cardCustomersRouter from '@modules/suppliers/infra/http/routes/cardCustomers.routes';
import cardCustomerServiceOrdersRouter from '@modules/suppliers/infra/http/routes/cardCustomerServiceOrders.routes';
import cardBudgetsRouter from '@modules/suppliers/infra/http/routes/cardBudgets.routes';
import comercialCardResultsRouter from '@modules/suppliers/infra/http/routes/comercialCardResults.routes';
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
import eventImagesRouter from '@modules/events/infra/http/routes/eventImages.routes';
import eventIsPublishedRouter from '@modules/events/infra/http/routes/eventIsPublished.routes';
import imageParticipantsRouter from '@modules/users/infra/http/routes/imageParticipants.routes';
import eventIsDateDefinedRouter from '@modules/events/infra/http/routes/eventIsDateDefined.routes';
import eventDatesVotingRouter from '@modules/events/infra/http/routes/eventDatesVoting.routes';
import eventDateVotesRouter from '@modules/events/infra/http/routes/eventDateVotes.routes';
import eventDateVotingTypeRouter from '@modules/events/infra/http/routes/eventDateVotingType.routes';
import suspendAccountRouter from '@modules/users/infra/http/routes/suspendAccount.routes';
import findUserByNameOrEmailRouter from '@modules/users/infra/http/routes/findUserByNameOrEmail.routes';
import userImageCategoriesRouter from '@modules/users/infra/http/routes/userImageCategories.routes';
import categoryImagesRouter from '@modules/users/infra/http/routes/categoryImages.routes';
import listEventImagesRouter from '@modules/events/infra/http/routes/listEventImages.routes';
import listUserAsImageParticipantsRouter from '@modules/events/infra/http/routes/listUserAsImageParticipants.routes';
import inspirationImagesRouter from '@modules/users/infra/http/routes/inspirationImages.routes';
import eventInspirationImagesRouter from '@modules/events/infra/http/routes/eventInspirationImages.routes';
import appointmentFilesRouter from '@modules/appointments/infra/http/routes/appointmentFiles.routes';
import listUserAppointmentsRouter from '@modules/appointments/infra/http/routes/listUserAppointments.routes';
import appointmentWPParticipantsRouter from '@modules/appointments/infra/http/routes/appointmentWPParticipants.routes';
import appointmentRemindersRouter from '@modules/appointments/infra/http/routes/appointmentReminders.routes';
import externalGuestsRouter from '@modules/events/infra/http/routes/externalGuests.routes';
import sendMassInvitationRouter from '@modules/weplan/infra/http/routes/SendMassInvitation.routes';
import importGuestsWithWhatsappAndEmail from '@modules/events/infra/http/routes/importGuestsWithWhatsappAndEmail.routes';
import eventSupplierSubCategoriesRouter from '@modules/suppliers/infra/http/routes/eventSupplierSubCategories.routes';
import eventSuppliersBySubCategoriesRouter from '@modules/suppliers/infra/http/routes/eventSuppliersBySubCategories.routes';
import showSupplierByTrimmedNameRouter from '@modules/suppliers/infra/http/routes/showSupplierByTrimmedName.routes';
import userContactPagesRouter from '@modules/contactPages/infra/http/routes/userContactPages.routes';
import contactPagePostsRouter from '@modules/contactPages/infra/http/routes/contactPagePosts.routes';
import contactPageLinksRouter from '@modules/contactPages/infra/http/routes/contactPageLinks.routes';
import userFormsRouter from '@modules/forms/infra/http/routes/userForms.routes';
import formFieldsRouter from '@modules/forms/infra/http/routes/formFields.routes';
import contactPageFormsRouter from '@modules/contactPages/infra/http/routes/contactPageForms.routes';
import contactPageCampaignsRouter from '@modules/contactPages/infra/http/routes/contactPageCampaigns.routes';
import contactPageSEORouter from '@modules/contactPages/infra/http/routes/contactPageSEO.routes';
import externalPageUserFormsRouter from '@modules/forms/infra/http/routes/externalPageUserForms.routes';
import formSuccessMessageRouter from '@modules/forms/infra/http/routes/formSuccessMessage.routes';
import formEmailNotificationsRouter from '@modules/forms/infra/http/routes/formEmailNotifications.routes';
import formEmailNotificationRecipientsRouter from '@modules/forms/infra/http/routes/formEmailNotificationRecipients.routes';
import formStylesRouter from '@modules/forms/infra/http/routes/formStyles.routes';
import formLandingPageRouter from '@modules/forms/infra/http/routes/formLandingPage.routes';
import sendFormEmailNotificationsRouter from '@modules/forms/infra/http/routes/sendFormEmailNotifications.routes';
import userExternalContactPagesRouter from '@modules/contactPages/infra/http/routes/userExternalContactPages.routes';
import contactPageImagePostRouter from '@modules/contactPages/infra/http/routes/contactPageImagePost.routes';
import authenticateUserWithGoogleRouter from '@modules/users/infra/http/routes/authenticateUserWithGoogle.routes';
import userManagementModuleRouter from '@modules/users/infra/http/routes/userManagementModules.routes';
import employeeManagementModuleRouter from '@modules/users/infra/http/routes/employeeManagementModules.routes';
import employeeSessionsRouter from '@modules/users/infra/http/routes/employeeSessions.routes';
import authenticateEmployeePROWithGoogleRouter from '@modules/users/infra/http/routes/authenticateEmployeePROWithGoogle.routes';
import companyContactNotesRouter from '@modules/suppliers/infra/http/routes/companyContactNotes.routes';
import googleProfileRouter from '@modules/googleProfiles/infra/http/routes/googleProfile.routes';
import userGoogleProfileRouter from '@modules/googleProfiles/infra/http/routes/userGoogleProfile.routes';
import findCompanyInfoByNameRouter from '@modules/users/infra/http/routes/findCompanyInfoByName.routes';
import sendCompanyActivationEmailRouter from '@modules/users/infra/http/routes/sendCompanyActivationEmail.routes';
import createFirstCompanyMasterRouter from '@modules/suppliers/infra/http/routes/createFirstCompanyMaster.routes';
import companyEmployeeContactRouter from '@modules/suppliers/infra/http/routes/companyEmployeeContact.routes';
import checkListTaskNotesRouter from '@modules/notes/infra/http/routes/checkListTaskNotes.routes';
import listInactiveComercialCardsRouter from '@modules/suppliers/infra/http/routes/listInactiveComercialCards.routes';

const routes = Router();

// ==> Used by Public Pages
routes.use('/event-suppliers-sub-categories', eventSupplierSubCategoriesRouter);
routes.use('/show-supplier', showSupplierByTrimmedNameRouter);
routes.use(
  '/event-suppliers-by-sub-category',
  eventSuppliersBySubCategoriesRouter,
);
routes.use('/user-contact-page', userContactPagesRouter);
routes.use('/user-external-contact-page', userExternalContactPagesRouter);
routes.use('/contact-page-seo', contactPageSEORouter);
routes.use('/contact-page-campaign', contactPageCampaignsRouter);
routes.use('/contact-page-form', contactPageFormsRouter);
routes.use('/contact-page-post', contactPagePostsRouter);
routes.use('/contact-page-image-post', contactPageImagePostRouter);
routes.use('/contact-page-link', contactPageLinksRouter);
routes.use('/external-user-form', externalPageUserFormsRouter);
routes.use('/send-form-results', sendFormEmailNotificationsRouter);
// ==> End

// ==> Google Authentication
routes.use('/google-sessions', authenticateUserWithGoogleRouter);

// EmployeeAthentication
routes.use('/employee-pro-sessions', employeeSessionsRouter);
routes.use(
  '/google-employee-pro-sessions',
  authenticateEmployeePROWithGoogleRouter,
);

// ==> UserManagementModule
// ==> EmployeeManagementModule
routes.use('/user-management-modules', userManagementModuleRouter);
routes.use('/employee-management-modules', employeeManagementModuleRouter);

routes.use('/user-form', userFormsRouter);
routes.use('/form-field', formFieldsRouter);
routes.use('/form-styles', formStylesRouter);
routes.use('/form-landing-page', formLandingPageRouter);
routes.use('/form-email-notification', formEmailNotificationsRouter);
routes.use(
  '/form-email-notification-recipient',
  formEmailNotificationRecipientsRouter,
);
routes.use('/form-success-message', formSuccessMessageRouter);

routes.use('/appointments', appointmentsRouter);
routes.use('/appointment/files', appointmentFilesRouter);
routes.use('/appointment/reminders', appointmentRemindersRouter);
routes.use('/appointment/wp-participants', appointmentWPParticipantsRouter);

routes.use('/user-appointments', listUserAppointmentsRouter);
routes.use('/external-guests', externalGuestsRouter);
routes.use('/mass-invitation', sendMassInvitationRouter);

routes.use('/first-master', createFirstCompanyMasterRouter);
routes.use('/users', usersRouter);
routes.use('/user/name-or-email', findUserByNameOrEmailRouter);
routes.use('/user/activation', activationUserRouter);
routes.use('/company/activation', sendCompanyActivationEmailRouter);
routes.use('/user/suspend', suspendAccountRouter);
routes.use('/user/delete', deleteUserRouter);
routes.use('/user/terminate', terminateUserRouter);
routes.use('/event-guests', guestsRouter);
routes.use('/event/dates', eventDatesRouter);
routes.use('/event/dates/voting', eventDatesVotingRouter);
routes.use('/event/date/voting-type', eventDateVotingTypeRouter);
routes.use('/event/date/vote', eventDateVotesRouter);
routes.use('/user/confirmations', userConfirmationsRouter);
routes.use('/wp-guest/confirmations', wpGuestConfirmationsRouter);
routes.use('/user/confirmation-files', userConfirmationFilesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/user-profile', userProfileRouter);
routes.use('/company-info', companyInfoRouter);
routes.use('/find-company-info-by-name', findCompanyInfoByNameRouter);
routes.use('/guest-contact-info', guestContactInfosRouter);
routes.use('/person-info', personInfoRouter);
routes.use('/user-birthdate', userBirthdateRouter);
routes.use('/contact-types', contactTypesRouter);
routes.use('/guest-list/whatsapp/email', importGuestsWithWhatsappAndEmail);

routes.use('/weplan-guest-messages', weplanGuestMessagesRouter);

routes.use('/user/event/images', listEventImagesRouter);
routes.use('/user/image/participants', listUserAsImageParticipantsRouter);

routes.use('/inspiration/images', inspirationImagesRouter);
routes.use('/event/inspiration/images', eventInspirationImagesRouter);

routes.use('/user/images', userImagesRouter);
routes.use('/user/image/categories', userImageCategoriesRouter);
routes.use('/category/images', categoryImagesRouter);
routes.use('/image/participants', imageParticipantsRouter);

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
routes.use('/event/is-published', eventIsPublishedRouter);
routes.use('/event/is-date-defined', eventIsDateDefinedRouter);
routes.use('/event/weplan-guests', weplanGuestsRouter);
routes.use('/event/number-of-guests', eventNumberOfGuestsRouter);
routes.use('/owner/number-of-guests', eventOwnerNumberOfGuestsRouter);
routes.use('/member/number-of-guests', eventMemberNumberOfGuestsRouter);
routes.use('/event/notes', eventNotesRouter);
routes.use('/event/files', eventFilesRouter);
routes.use('/event/images', eventImagesRouter);
routes.use('/event/invitations', eventInvitationsRouter);
routes.use('/event/user/supplier-notes', eventUserSupplierNotesRouter);
routes.use('/event/service-orders', eventServiceOrdersRouter);
routes.use('/event-types', eventTypesRouter);
routes.use('/friends-events', friendsEventsRouter);

routes.use('/suppliers', suppliersRouter);
routes.use('/company-employees', companyEmployeesRouter);
routes.use('/company-employee-contact', companyEmployeeContactRouter);
routes.use('/suppliers/categories', supplierCategoriesRouter);
routes.use('/wp-products', weplanProductsRouter);
routes.use('/wp/contract-orders', weplanContractOrdersRouter);
routes.use('/wp-management-modules', weplanManagementModulesRouter);
routes.use('/funnel-types', funnelTypesRouter);
routes.use('/funnels', supplierFunnelsRouter);
routes.use('/cards', cardsRouter);
routes.use('/inactive-cards', listInactiveComercialCardsRouter);
routes.use('/card/participants', cardParticipantsRouter);
routes.use('/card/outside-participants', cardOutsideParticipantsRouter);
routes.use('/card/customers', cardCustomersRouter);
routes.use('/card/customer-service-orders', cardCustomerServiceOrdersRouter);
routes.use('/card/budgets', cardBudgetsRouter);
routes.use('/comercial-card-results', comercialCardResultsRouter);
routes.use('/company/contacts/', companyContactsRouter);
routes.use('/company/contacts/notes', companyContactNotesRouter);
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
// GoogleProfile
routes.use('/google-profile', googleProfileRouter);
routes.use('/user-google-profile', userGoogleProfileRouter);
// Default funnel-card info-field
routes.use('/comercial/funnel', comercialFunnelDefaultInfoFieldsRouter);
routes.use('/production/funnel', productionFunnelDefaultInfoFieldsRouter);
routes.use('/projects/funnel', projectsFunnelDefaultInfoFieldsRouter);
routes.use('/financial/funnel', financialFunnelDefaultInfoFieldsRouter);

routes.use('/finances', financesRouter);
routes.use('/check-lists', checkListRouter);
routes.use('/check-list-cards', checkListCardsRouter);
routes.use('/check-list-task-notes', checkListTaskNotesRouter);
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
