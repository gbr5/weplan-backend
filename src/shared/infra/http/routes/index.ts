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
import transactionsRouter from '@modules/transactions/infra/http/routes/transactions.routes';
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
import weplanGuestsRouter from '@modules/events/infra/http/routes/weplanGuests.routes';
import nextEventRouter from '@modules/events/infra/http/routes/nextEvent.routes';
import listEventsRouter from '@modules/events/infra/http/routes/listEvents.routes';
import eventNumberOfGuestsRouter from '@modules/events/infra/http/routes/eventNumberOfGuests.routes';
import eventOwnerNumberOfGuestsRouter from '@modules/events/infra/http/routes/eventOwnerNumberOfGuests.routes';
import eventMemberNumberOfGuestsRouter from '@modules/events/infra/http/routes/eventMemberNumberOfGuests.routes';
import guestContactInfosRouter from '@modules/events/infra/http/routes/guestContactInfos.routes';
import guestContactsRouter from '@modules/events/infra/http/routes/guestContacts.routes';
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
import employeeCheckListRouter from '@modules/checklists/infra/http/routes/employeeCheckList.routes';
import listOwnerCardsRouter from '@modules/suppliers/infra/http/routes/listOwnerCards.routes';
import eventTasksRouter from '@modules/events/infra/http/routes/eventTasks.routes';
import notesRouter from '@modules/notes/infra/http/routes/notes.routes';
import weddingTasksRouter from '@modules/events/infra/http/routes/weddingTasks.routes';
import supplierSubCategoriesRouter from '@modules/suppliers/infra/http/routes/supplierSubCategories.routes';
import eventSuppliersRouter from '@modules/suppliers/infra/http/routes/eventSuppliers.routes';
import eventInfoRouter from '@modules/events/infra/http/routes/eventInfo.routes';
import eventBudgetRouter from '@modules/events/infra/http/routes/eventBudget.routes';
import listPayeeTransactionsRouter from '@modules/transactions/infra/http/routes/listPayeeTransactions.routes';
import listPayerTransactionsRouter from '@modules/transactions/infra/http/routes/listPayerTransactions.routes';
import eventSupplierTransactionAgreementsRouter from '@modules/transactions/infra/http/routes/eventSupplierTransactionAgreements.routes';
import eventSupplierTransactionsRouter from '@modules/transactions/infra/http/routes/eventSupplierTransactions.routes';
import createEventSupplierTransactionAgreementWithTransactionsRouter from '@modules/transactions/infra/http/routes/eventSupplierTransactionAgreementWithTransactions.routes';
import deleteEventSupplierTransactionAgreementsRouter from '@modules/transactions/infra/http/routes/deleteEventSupplierTransactionAgreements.routes';
import eventOwnersRouter from '@modules/events/infra/http/routes/eventOwners.routes';
import eventMembersRouter from '@modules/events/infra/http/routes/eventMembers.routes';
import createMultipleMobileGuestsRouter from '@modules/events/infra/http/routes/createMultipleMobileGuests.routes';
import eventSupplierNotesRouter from '@modules/notes/infra/http/routes/eventSupplierNotes.routes';
import createEventNoteAndEventSupplierNoteRouter from '@modules/notes/infra/http/routes/createEventNoteAndEventSupplierNote.routes';
import transactionNotesRouter from '@modules/notes/infra/http/routes/transactionNotes.routes';
import createEventNoteAndTransactionNoteRouter from '@modules/notes/infra/http/routes/createEventNoteAndTransactionNote.routes';
import createEventSupplierNoteAndTransactionNoteRouter from '@modules/notes/infra/http/routes/createEventSupplierNoteAndTransactionNote.routes';
import transactionFilesRouter from '@modules/transactions/infra/http/routes/transactionFiles.routes';
import eventSupplierFilesRouter from '@modules/suppliers/infra/http/routes/eventSupplierFiles.routes';
import eventSupplierBudgetsRouter from '@modules/suppliers/infra/http/routes/eventSupplierBudgets.routes';
import listUserTransactionsRouter from '@modules/transactions/infra/http/routes/listUserTransactions.routes';
import listEventTransactionsRouter from '@modules/transactions/infra/http/routes/listEventTransactions.routes';
import findUserByEmailOrUserNameRouter from '@modules/users/infra/http/routes/findUserByEmailOrUserName.routes';
import userFriendsRouter from '@modules/users/infra/http/routes/userFriends.routes';
import listUserFriendRequestsRouter from '@modules/users/infra/http/routes/listUserFriendRequests.routes';
import createMultipleWePlanGuestsRouter from '@modules/events/infra/http/routes/createMultipleWePlanGuests.routes';
import associateUserToEventGuestRouter from '@modules/events/infra/http/routes/associateUserToEventGuest.routes';
import authenticateUserWithAppleRouter from '@modules/users/infra/http/routes/authenticateUserWithApple.routes';
import listTasksByUserRouter from '@modules/tasks/infra/http/routes/listTasksByUser.routes';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import taskNotesRouter from '@modules/tasks/infra/http/routes/taskNotes.routes';
import taskFollowersRouter from '@modules/tasks/infra/http/routes/taskFollowers.routes';
import createMultipleTaskFollowersRouter from '@modules/tasks/infra/http/routes/createMultipleTaskFollowers.routes';
import listEventTasksByUserRouter from '@modules/events/infra/http/routes/listEventTasksByUser.routes';
import createMultipleEventOwnersRouter from '@modules/events/infra/http/routes/createMultipleEventOwners.routes';
import createMultipleEventMembersRouter from '@modules/events/infra/http/routes/createMultipleEventMembers.routes';
import eventMemberTransactionAgreementsRouter from '@modules/transactions/infra/http/routes/eventMemberTransactionAgreements.routes';
import eventMemberTransactionsRouter from '@modules/transactions/infra/http/routes/eventMemberTransactions.routes';
import eventOwnerTransactionAgreementsRouter from '@modules/transactions/infra/http/routes/eventOwnerTransactionAgreements.routes';
import eventOwnerTransactionsRouter from '@modules/transactions/infra/http/routes/eventOwnerTransactions.routes';
import createEventMemberTransactionAgreementWithTransactionsRouter from '@modules/transactions/infra/http/routes/eventMemberTransactionAgreementWithTransactions.routes';
import createEventOwnerTransactionAgreementWithTransactionsRouter from '@modules/transactions/infra/http/routes/eventOwnerTransactionAgreementWithTransactions.routes';
import eventMemberNotesRouter from '@modules/notes/infra/http/routes/eventMemberNotes.routes';
import eventOwnerNotesRouter from '@modules/notes/infra/http/routes/eventOwnerNotes.routes';
import createEventOwnerTaskRouter from '@modules/events/infra/http/routes/createEventOwnerTask.routes';
import createEventMemberTaskRouter from '@modules/events/infra/http/routes/createEventMemberTask.routes';
import createEventWePlanSupplierTaskRouter from '@modules/events/infra/http/routes/createEventWePlanSupplierTask.routes';
import createEventParticipantMonthlyPaymentAgreementsRouter from '@modules/events/infra/http/routes/createEventParticipantMonthlyPaymentAgreements.routes';
import eventMonthlyPaymentAgreementsRouter from '@modules/events/infra/http/routes/eventMonthlyPaymentAgreements.routes';
import eventOwnersNumberOfGuestsRouter from '@modules/events/infra/http/routes/eventOwnersNumberOfGuests.routes';
import eventMembersNumberOfGuestsRouter from '@modules/events/infra/http/routes/eventMembersNumberOfGuests.routes';
import defineEventMembersNumberOfGuestsRouter from '@modules/events/infra/http/routes/defineEventMembersNumberOfGuests.routes';

const routes = Router();

// ==> Find User By Email or UserName
routes.use('/find-user-by-email-or-user-name', findUserByEmailOrUserNameRouter);

// ==> User Friends
routes.use('/user-friends', userFriendsRouter);

// ==> List User Friend Requests
routes.use('/list-user-friend-requests', listUserFriendRequestsRouter);

// ==> Notes
routes.use('/notes', notesRouter);

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

// ==> Apple Authentication
routes.use('/apple-sessions', authenticateUserWithAppleRouter);

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
routes.use('/associate-user-to-event-guest', associateUserToEventGuestRouter);
routes.use('/event/dates', eventDatesRouter);

// Tasks
routes.use('/tasks', tasksRouter);
routes.use('/task-notes', taskNotesRouter);
routes.use('/task-followers', taskFollowersRouter);
routes.use(
  '/create-multiple-task-followers',
  createMultipleTaskFollowersRouter,
);
routes.use(
  '/create-event-participant-monthly-payment-agreements',
  createEventParticipantMonthlyPaymentAgreementsRouter,
);
routes.use(
  '/event-monthly-payment-agreements',
  eventMonthlyPaymentAgreementsRouter,
);
routes.use('/list-user-tasks', listTasksByUserRouter);

routes.use('/event-tasks', eventTasksRouter);
routes.use('/create-event-owner-task', createEventOwnerTaskRouter);
routes.use('/create-event-member-task', createEventMemberTaskRouter);
routes.use(
  '/create-event-weplan-supplier-task',
  createEventWePlanSupplierTaskRouter,
);
routes.use('/list-event-tasks-by-user', listEventTasksByUserRouter);
routes.use('/wedding-tasks', weddingTasksRouter);

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
routes.use('/guest-contacts', guestContactsRouter);
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

routes.use('/event-info', eventInfoRouter);
routes.use('/event-budget', eventBudgetRouter);

routes.use('/event/is-published', eventIsPublishedRouter);
routes.use('/event/is-date-defined', eventIsDateDefinedRouter);
routes.use('/event/weplan-guests', weplanGuestsRouter);
routes.use('/event/number-of-guests', eventNumberOfGuestsRouter);
routes.use(
  '/define-event-members-number-of-guests',
  defineEventMembersNumberOfGuestsRouter,
);
routes.use('/owner/number-of-guests', eventOwnerNumberOfGuestsRouter);
routes.use('/owners/number-of-guests', eventOwnersNumberOfGuestsRouter);
routes.use('/member/number-of-guests', eventMemberNumberOfGuestsRouter);
routes.use('/members/number-of-guests', eventMembersNumberOfGuestsRouter);

// Event Notes
routes.use('/event-notes', eventNotesRouter);

// Event Supplier Notes
routes.use('/event-supplier-notes', eventSupplierNotesRouter);
// Create Event And Event Supplier Notes
routes.use(
  '/create-event-and-supplier-note',
  createEventNoteAndEventSupplierNoteRouter,
);

// Transaction Notes
routes.use('/transaction-notes', transactionNotesRouter);
// Create Event And Transaction Notes
routes.use(
  '/create-event-and-transaction-note',
  createEventNoteAndTransactionNoteRouter,
);
// Create Event Supplier And Transaction Notes
routes.use(
  '/create-event-supplier-and-transaction-note',
  createEventSupplierNoteAndTransactionNoteRouter,
);

routes.use('/event/files', eventFilesRouter);
routes.use('/event/images', eventImagesRouter);
routes.use('/event/invitations', eventInvitationsRouter);
routes.use('/event/service-orders', eventServiceOrdersRouter);
routes.use('/event-types', eventTypesRouter);
routes.use('/friends-events', friendsEventsRouter);

routes.use('/suppliers', suppliersRouter);
routes.use('/event-suppliers', eventSuppliersRouter);
routes.use('/supplier-sub-categories', supplierSubCategoriesRouter);
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

// Transactions
routes.use('/transactions', transactionsRouter);
routes.use('/list-payee-transactions', listPayeeTransactionsRouter);
routes.use('/list-payer-transactions', listPayerTransactionsRouter);
routes.use('/list-user-transactions', listUserTransactionsRouter);
routes.use('/list-event-transactions', listEventTransactionsRouter);

// Transaction Files
routes.use('/transaction-files', transactionFilesRouter);

// Event Member Notes
routes.use('/event-member-notes', eventMemberNotesRouter);

// Event Member Transaction Agreements
routes.use(
  '/event-member-transaction-agreements',
  eventMemberTransactionAgreementsRouter,
);
routes.use('/event-member-transactions', eventMemberTransactionsRouter);
routes.use(
  '/event-member-transaction-agreement-with-transactions',
  createEventMemberTransactionAgreementWithTransactionsRouter,
);

// Event Owner Notes
routes.use('/event-owner-notes', eventOwnerNotesRouter);

// Event Owner Transaction Agreements
routes.use(
  '/event-owner-transaction-agreements',
  eventOwnerTransactionAgreementsRouter,
);
routes.use('/event-owner-transactions', eventOwnerTransactionsRouter);
routes.use(
  '/event-owner-transaction-agreement-with-transactions',
  createEventOwnerTransactionAgreementWithTransactionsRouter,
);
// Event Supplier Transaction Agreements
routes.use(
  '/event-supplier-transaction-agreements',
  eventSupplierTransactionAgreementsRouter,
);
// Delete Event Supplier Transaction Agreements
routes.use(
  '/delete-event-supplier-transaction-agreements',
  deleteEventSupplierTransactionAgreementsRouter,
);

// Event Supplier Transaction Agreement With Transactions
routes.use(
  '/event-supplier-transaction-agreement-with-transactions',
  createEventSupplierTransactionAgreementWithTransactionsRouter,
);

// Event Supplier Transactions
routes.use('/event-supplier-transactions', eventSupplierTransactionsRouter);

// Event Supplier Files
routes.use('/event-supplier-files', eventSupplierFilesRouter);

// Event Supplier Budgets
routes.use('/event-supplier-budgets', eventSupplierBudgetsRouter);

// Event Owners
routes.use('/event-owners', eventOwnersRouter);
routes.use('/create-multiple-event-owners', createMultipleEventOwnersRouter);

// Event Members
routes.use('/event-members', eventMembersRouter);
routes.use('/create-multiple-event-members', createMultipleEventMembersRouter);

// Create Multiple Mobile Guests
routes.use('/create-multiple-mobile-guests', createMultipleMobileGuestsRouter);

// Create Multiple WePlan Guests
routes.use('/create-multiple-weplan-guests', createMultipleWePlanGuestsRouter);

routes.use('/list-owner-cards', listOwnerCardsRouter);
routes.use('/check-lists', checkListRouter);
routes.use('/employee-check-list', employeeCheckListRouter);
routes.use('/check-list-cards', checkListCardsRouter);
routes.use('/check-list-task-notes', checkListTaskNotesRouter);
routes.use('/card/check-lists', cardCheckListRouter);

export default routes;
