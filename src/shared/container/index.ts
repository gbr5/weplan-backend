import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IAppointmentTypesRepository from '@modules/appointments/repositories/IAppointmentTypesRepository';
import AppointmentTypesRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentTypesRepository';

import INonUserAppointmentGuestsRepository from '@modules/appointments/repositories/INonUserAppointmentGuestsRepository';
import NonUserAppointmentGuestsRepository from '@modules/appointments/infra/typeorm/repositories/NonUserAppointmentGuestsRepository';

import IWeplanAppointmentGuestsRepository from '@modules/appointments/repositories/IWeplanAppointmentGuestsRepository';
import WeplanAppointmentGuestsRepository from '@modules/appointments/infra/typeorm/repositories/WeplanAppointmentGuestsRepository';

import IEventAppointmentsRepository from '@modules/appointments/repositories/IEventAppointmentsRepository';
import EventAppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/EventAppointmentsRepository';

import IStageCardAppointmentsRepository from '@modules/appointments/repositories/IStageCardAppointmentsRepository';
import StageCardAppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/StageCardAppointmentsRepository';

import ICheckListsRepository from '@modules/checklists/repositories/ICheckListsRepository';
import CheckListsRepository from '@modules/checklists/infra/typeorm/repositories/CheckListsRepository';

import ICheckListTasksRepository from '@modules/checklists/repositories/ICheckListTasksRepository';
import CheckListTasksRepository from '@modules/checklists/infra/typeorm/repositories/CheckListTasksRepository';

import ICardCheckListsRepository from '@modules/checklists/repositories/ICardCheckListsRepository';
import CardCheckListsRepository from '@modules/checklists/infra/typeorm/repositories/CardCheckListsRepository';

import ICardBudgetInstallmentsRepository from '@modules/suppliers/repositories/ICardBudgetInstallmentsRepository';
import CardBudgetInstallmentsRepository from '@modules/suppliers/infra/typeorm/repositories/CardBudgetInstallmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import ICompanyInfoRepository from '@modules/users/repositories/ICompanyInfoRepository';
import CompanyInfoRepository from '@modules/users/infra/typeorm/repositories/CompanyInfoRepository';

import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import UserConfirmationRepository from '@modules/users/infra/typeorm/repositories/UserConfirmationRepository';

import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import UserManagementModulesRepository from '@modules/users/infra/typeorm/repositories/UserManagementModulesRepository';

import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import CompanyMasterUsersRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyMasterUsersRepository';

import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';
import PersonInfoRepository from '@modules/users/infra/typeorm/repositories/PersonInfoRepository';

import IUserBirthdateRepository from '@modules/users/repositories/IUserBirthdateRepository';
import UserBirthdateRepository from '@modules/users/infra/typeorm/repositories/UserBirthdateRepository';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository';

import IEventTypesRepository from '@modules/events/repositories/IEventTypesRepository';
import EventTypesRepository from '@modules/events/infra/typeorm/repositories/EventTypesRepository';

import IEventTypeSuppliersRepository from '@modules/events/repositories/IEventTypeSuppliersRepository';
import EventTypeSuppliersRepository from '@modules/events/infra/typeorm/repositories/EventTypeSuppliersRepository';

import IWeplanManagementModulesRepository from '@modules/weplan/repositories/IWeplanManagementModulesRepository';
import WeplanManagementModulesRepository from '@modules/weplan/infra/typeorm/repositories/WeplanManagementModulesRepository';

import IWeplanProductsRepository from '@modules/weplan/repositories/IWeplanProductsRepository';
import WeplanProductsRepository from '@modules/weplan/infra/typeorm/repositories/WeplanProductsRepository';

import IEventWeplanSuppliersRepository from '@modules/events/repositories/IEventWeplanSuppliersRepository';
import EventWeplanSuppliersRepository from '@modules/events/infra/typeorm/repositories/EventWeplanSuppliersRepository';

import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import EventSuppliersRepository from '@modules/events/infra/typeorm/repositories/EventSuppliersRepository';

import ISupplierCategoriesRepository from '@modules/suppliers/repositories/ISupplierCategoriesRepository';
import SupplierCategoriesRepository from '@modules/suppliers/infra/typeorm/repositories/SupplierCategoriesRepository';

import ISupplierSubCategoriesRepository from '@modules/suppliers/repositories/ISupplierSubCategoriesRepository';
import SupplierSubCategoriesRepository from '@modules/suppliers/infra/typeorm/repositories/SupplierSubCategoriesRepository';

import IUserSupplierCategoriesRepository from '@modules/suppliers/repositories/IUserSupplierCategoriesRepository';
import UserSupplierCategoriesRepository from '@modules/suppliers/infra/typeorm/repositories/UserSupplierCategoriesRepository';

import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';
import UserCheckListsRepository from '@modules/events/infra/typeorm/repositories/UserCheckListsRepository';

import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import GuestsRepository from '@modules/events/infra/typeorm/repositories/GuestsRepository';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import WeplanGuestsRepository from '@modules/events/infra/typeorm/repositories/WeplanGuestsRepository';

import IEventPlannersRepository from '@modules/events/repositories/IEventPlannersRepository';
import EventPlannersRepository from '@modules/events/infra/typeorm/repositories/EventPlannersRepository';

import IContactTypesRepository from '@modules/users/repositories/IContactTypesRepository';
import ContactTypesRepository from '@modules/users/infra/typeorm/repositories/ContactTypesRepository';

import IUserContactInfosRepository from '@modules/users/repositories/IUserContactInfosRepository';
import UserContactInfosRepository from '@modules/users/infra/typeorm/repositories/UserContactInfosRepository';

import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import EventOwnersRepository from '@modules/events/infra/typeorm/repositories/EventOwnersRepository';

import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import EventMembersRepository from '@modules/events/infra/typeorm/repositories/EventMembersRepository';

import IEventInfosRepository from '@modules/events/repositories/IEventInfosRepository';
import EventInfosRepository from '@modules/events/infra/typeorm/repositories/EventInfosRepository';

import IFunnelTypesRepository from '@modules/suppliers/repositories/IFunnelTypesRepository';
import FunnelTypesRepository from '@modules/suppliers/infra/typeorm/repositories/FunnelTypesRepository';

import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';
import FunnelsRepository from '@modules/suppliers/infra/typeorm/repositories/FunnelsRepository';

import IFunnelStagesRepository from '@modules/suppliers/repositories/IFunnelStagesRepository';
import FunnelStagesRepository from '@modules/suppliers/infra/typeorm/repositories/FunnelStagesRepository';

import IStageCardsRepository from '@modules/suppliers/repositories/IStageCardsRepository';
import StageCardsRepository from '@modules/suppliers/infra/typeorm/repositories/StageCardsRepository';

import IEventCardsRepository from '@modules/suppliers/repositories/IEventCardsRepository';
import EventCardsRepository from '@modules/suppliers/infra/typeorm/repositories/EventCardsRepository';

import ICardNotesRepository from '@modules/suppliers/repositories/ICardNotesRepository';
import CardNotesRepository from '@modules/suppliers/infra/typeorm/repositories/CardNotesRepository';

import ICardParticipantsRepository from '@modules/suppliers/repositories/ICardParticipantsRepository';
import CardParticipantsRepository from '@modules/suppliers/infra/typeorm/repositories/CardParticipantsRepository';

import ICardOutsideParticipantsRepository from '@modules/suppliers/repositories/ICardOutsideParticipantsRepository';
import CardOutsideParticipantsRepository from '@modules/suppliers/infra/typeorm/repositories/CardOutsideParticipantsRepository';

import ICardCustomersRepository from '@modules/suppliers/repositories/ICardCustomersRepository';
import CardCustomersRepository from '@modules/suppliers/infra/typeorm/repositories/CardCustomersRepository';

import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import CompanyEmployeesRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyEmployeesRepository';

import ICompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfoFieldsRepository';
import CompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyFunnelCardInfoFieldsRepository';

import ICompanyFunnelCardInfosRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfosRepository';
import CompanyFunnelCardInfosRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyFunnelCardInfosRepository';

import ISupplierWeekDayAppointmentsRepository from '@modules/appointments/repositories/ISupplierWeekDayAppointmentsRepository';
import SupplierWeekDayAppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/SupplierWeekDayAppointmentsRepository';

import ISupplierAppointmentDaysOffRepository from '@modules/appointments/repositories/ISupplierAppointmentDaysOffRepository';
import SupplierAppointmentDaysOffRepository from '@modules/appointments/infra/typeorm/repositories/SupplierAppointmentDaysOffRepository';

import ISupplierAppointmentDaySchedulesRepository from '@modules/appointments/repositories/ISupplierAppointmentDaySchedulesRepository';
import SupplierAppointmentDaySchedulesRepository from '@modules/appointments/infra/typeorm/repositories/SupplierAppointmentDaySchedulesRepository';

import ISupplierAppointmentDayIntervalsRepository from '@modules/appointments/repositories/ISupplierAppointmentDayIntervalsRepository';
import SupplierAppointmentDayIntervalsRepository from '@modules/appointments/infra/typeorm/repositories/SupplierAppointmentDayIntervalsRepository';

import ISupplierProductRepository from '@modules/suppliers/repositories/ISupplierProductRepository';
import SupplierProductRepository from '@modules/suppliers/infra/typeorm/repositories/SupplierProductsRepository';

import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';
import CompanyContactsRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyContactsRepository';

import ICompanyContactInfosRepository from '@modules/suppliers/repositories/ICompanyContactInfosRepository';
import CompanyContactInfosRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyContactInfosRepository';

import ICompanyContactWeplanUsersRepository from '@modules/suppliers/repositories/ICompanyContactWeplanUsersRepository';
import CompanyContactWeplanUsersRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyContactWeplanUsersRepository';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import UserFriendsRepository from '@modules/users/infra/typeorm/repositories/UserFriendsRepository';

import IWeplanContractOrdersRepository from '@modules/weplan/repositories/IWeplanContractOrdersRepository';
import WeplanContractOrdersRepository from '@modules/weplan/infra/typeorm/repositories/WeplanContractOrdersRepository';

import IWeplanContractOrderProductsRepository from '@modules/weplan/repositories/IWeplanContractOrderProductsRepository';
import WeplanContractOrderProductsRepository from '@modules/weplan/infra/typeorm/repositories/WeplanContractOrderProductsRepository';

import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';
import CardBudgetsRepository from '@modules/suppliers/infra/typeorm/repositories/CardBudgetsRepository';

import ICardCustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICardCustomerServiceOrdersRepository';
import CardCustomerServiceOrdersRepository from '@modules/suppliers/infra/typeorm/repositories/CardCustomerServiceOrdersRepository';

import ICustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICustomerServiceOrdersRepository';
import CustomerServiceOrdersRepository from '@modules/suppliers/infra/typeorm/repositories/CustomerServiceOrdersRepository';

import ICompanyDefaultServiceOrderFieldsRepository from '@modules/suppliers/repositories/ICompanyDefaultServiceOrderFieldsRepository';
import CompanyDefaultServiceOrderFieldsRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyDefaultServiceOrderFieldsRepository';

import ICustomerServiceOrderFieldAnswersRepository from '@modules/suppliers/repositories/ICustomerServiceOrderFieldAnswersRepository';
import CustomerServiceOrderFieldAnswersRepository from '@modules/suppliers/infra/typeorm/repositories/CustomerServiceOrderFieldAnswersRepository';

import IEventServiceOrdersRepository from '@modules/events/repositories/IEventServiceOrdersRepository';
import EventServiceOrdersRepository from '@modules/events/infra/typeorm/repositories/EventServiceOrdersRepository';

import IUserFilesRepository from '@modules/users/repositories/IUserFilesRepository';
import UserFilesRepository from '@modules/users/infra/typeorm/repositories/UserFilesRepository';

import IUserFileCategoriesRepository from '@modules/users/repositories/IUserFileCategoriesRepository';
import UserFileCategoriesRepository from '@modules/users/infra/typeorm/repositories/UserFileCategoriesRepository';

import ICategoryFilesRepository from '@modules/users/repositories/ICategoryFilesRepository';
import CategoryFilesRepository from '@modules/users/infra/typeorm/repositories/CategoryFilesRepository';

import ICardFilesRepository from '@modules/users/repositories/ICardFilesRepository';
import CardFilesRepository from '@modules/users/infra/typeorm/repositories/CardFilesRepository';

import IContactFilesRepository from '@modules/users/repositories/IContactFilesRepository';
import ContactFilesRepository from '@modules/users/infra/typeorm/repositories/ContactFilesRepository';

import IBudgetFilesRepository from '@modules/users/repositories/IBudgetFilesRepository';
import BudgetFilesRepository from '@modules/users/infra/typeorm/repositories/BudgetFilesRepository';

import IEmployeeFilesRepository from '@modules/users/repositories/IEmployeeFilesRepository';
import EmployeeFilesRepository from '@modules/users/infra/typeorm/repositories/EmployeeFilesRepository';

import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import EventNotesRepository from '@modules/events/infra/typeorm/repositories/EventNotesRepository';

import IGuestContactInfosRepository from '@modules/events/repositories/IGuestContactInfosRepository';
import GuestContactInfosRepository from '@modules/events/infra/typeorm/repositories/GuestContactInfosRepository';

import IUserConfirmationFilesRepository from '@modules/users/repositories/IUserConfirmationFilesRepository';
import UserConfirmationFilesRepository from '@modules/users/infra/typeorm/repositories/UserConfirmationFilesRepository';

import IEventDatesRepository from '@modules/events/repositories/IEventDatesRepository';
import EventDatesRepository from '@modules/events/infra/typeorm/repositories/EventDatesRepository';

import IEventFilesRepository from '@modules/events/repositories/IEventFilesRepository';
import EventFilesRepository from '@modules/events/infra/typeorm/repositories/EventFilesRepository';

import IUserImagesRepository from '@modules/users/repositories/IUserImagesRepository';
import UserImagesRepository from '@modules/users/infra/typeorm/repositories/UserImagesRepository';

import IEventImagesRepository from '@modules/events/repositories/IEventImagesRepository';
import EventImagesRepository from '@modules/events/infra/typeorm/repositories/EventImagesRepository';

import IImageParticipantsRepository from '@modules/users/repositories/IImageParticipantsRepository';
import ImageParticipantsRepository from '@modules/users/infra/typeorm/repositories/ImageParticipantsRepository';

import IEventDateVotesRepository from '@modules/events/repositories/IEventDateVotesRepository';
import EventDateVotesRepository from '@modules/events/infra/typeorm/repositories/EventDateVotesRepository';

import IUserImageCategoriesRepository from '@modules/users/repositories/IUserImageCategoriesRepository';
import UserImageCategoriesRepository from '@modules/users/infra/typeorm/repositories/UserImageCategoriesRepository';

import ICategoryImagesRepository from '@modules/users/repositories/ICategoryImagesRepository';
import CategoryImagesRepository from '@modules/users/infra/typeorm/repositories/CategoryImagesRepository';

import IInspirationImagesRepository from '@modules/users/repositories/IInspirationImagesRepository';
import InspirationImagesRepository from '@modules/users/infra/typeorm/repositories/InspirationImagesRepository';

import IEventInspirationImagesRepository from '@modules/events/repositories/IEventInspirationImagesRepository';
import EventInspirationImagesRepository from '@modules/events/infra/typeorm/repositories/EventInspirationImagesRepository';

import IAppointmentFilesRepository from '@modules/appointments/repositories/IAppointmentFilesRepository';
import AppointmentFilesRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentFilesRepository';

import IAppointmentRemindersRepository from '@modules/appointments/repositories/IAppointmentRemindersRepository';
import AppointmentRemindersRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRemindersRepository';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import UserContactPagesRepository from '@modules/contactPages/infra/typeorm/repositories/UserContactPagesRepository';

import IContactPagePostsRepository from '@modules/contactPages/repositories/IContactPagePostsRepository';
import ContactPagePostsRepository from '@modules/contactPages/infra/typeorm/repositories/ContactPagePostsRepository';

import IContactPageLinksRepository from '@modules/contactPages/repositories/IContactPageLinksRepository';
import ContactPageLinksRepository from '@modules/contactPages/infra/typeorm/repositories/ContactPageLinksRepository';

import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import UserFormsRepository from '@modules/forms/infra/typeorm/repositories/UserFormsRepository';

import IFormFieldsRepository from '@modules/forms/repositories/IFormFieldsRepository';
import FormFieldsRepository from '@modules/forms/infra/typeorm/repositories/FormFieldsRepository';

import IContactPageFormsRepository from '@modules/contactPages/repositories/IContactPageFormsRepository';
import ContactPageFormsRepository from '@modules/contactPages/infra/typeorm/repositories/ContactPageFormsRepository';

import IContactPageCampaignsRepository from '@modules/contactPages/repositories/IContactPageCampaignsRepository';
import ContactPageCampaignsRepository from '@modules/contactPages/infra/typeorm/repositories/ContactPageCampaignsRepository';

import IContactPageSEORepository from '@modules/contactPages/repositories/IContactPageSEORepository';
import ContactPageSEORepository from '@modules/contactPages/infra/typeorm/repositories/ContactPageSEORepository';

import IFormSuccessMessageRepository from '@modules/forms/repositories/IFormSuccessMessageRepository';
import FormSuccessMessageRepository from '@modules/forms/infra/typeorm/repositories/FormSuccessMessageRepository';

import IFormEmailNotificationsRepository from '@modules/forms/repositories/IFormEmailNotificationsRepository';
import FormEmailNotificationsRepository from '@modules/forms/infra/typeorm/repositories/FormEmailNotificationsRepository';

import IFormEmailNotificationRecipientsRepository from '@modules/forms/repositories/IFormEmailNotificationRecipientsRepository';
import FormEmailNotificationRecipientsRepository from '@modules/forms/infra/typeorm/repositories/FormEmailNotificationRecipientsRepository';

import IFormStylesRepository from '@modules/forms/repositories/IFormStylesRepository';
import FormStylesRepository from '@modules/forms/infra/typeorm/repositories/FormStylesRepository';

import IFormLandingPageRepository from '@modules/forms/repositories/IFormLandingPageRepository';
import FormLandingPageRepository from '@modules/forms/infra/typeorm/repositories/FormLandingPageRepository';

import ICompanyContactNotesRepository from '@modules/suppliers/repositories/ICompanyContactNotesRepository';
import CompanyContactNotesRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyContactNotesRepository';

import IGoogleProfilesRepository from '@modules/googleProfiles/repositories/IGoogleProfilesRepository';
import GoogleProfilesRepository from '@modules/googleProfiles/infra/typeorm/repositories/GoogleProfilesRepository';

import IUserGoogleProfilesRepository from '@modules/googleProfiles/repositories/IUserGoogleProfilesRepository';
import UserGoogleProfilesRepository from '@modules/googleProfiles/infra/typeorm/repositories/UserGoogleProfilesRepository';

import ICompanyEmployeeContactRepository from '@modules/suppliers/repositories/ICompanyEmployeeContactRepository';
import CompanyEmployeeContactRepository from '@modules/suppliers/infra/typeorm/repositories/CompanyEmployeeContactRepository';

import ICheckListTaskNotesRepository from '@modules/notes/repositories/ICheckListTaskNotesRepository';
import CheckListTaskNotesRepository from '@modules/notes/infra/typeorm/repositories/CheckListTaskNotesRepository';

import INotesRepository from '@modules/notes/repositories/INotesRepository';
import NotesRepository from '@modules/notes/infra/typeorm/repositories/NotesRepository';

import IComercialCardResultsRepository from '@modules/suppliers/repositories/IComercialCardResultsRepository';
import ComercialCardResultsRepository from '@modules/suppliers/infra/typeorm/repositories/ComercialCardResultsRepository';

import IEmployeeCheckListRepository from '@modules/checklists/repositories/IEmployeeCheckListRepository';
import EmployeeCheckListRepository from '@modules/checklists/infra/typeorm/repositories/EmployeeCheckListRepository';

import IGuestContactsRepository from '@modules/events/repositories/IGuestContactsRepository';
import GuestContactsRepository from '@modules/events/infra/typeorm/repositories/GuestContactsRepository';

import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import EventTasksRepository from '@modules/events/infra/typeorm/repositories/EventTasksRepository';

import IEventBudgetRepository from '@modules/events/repositories/IEventBudgetRepository';
import EventBudgetRepository from '@modules/events/infra/typeorm/repositories/EventBudgetRepository';

import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/transactions/infra/typeorm/repositories/TransactionsRepository';

import IEventSupplierTransactionAgreementsRepository from '@modules/transactions/repositories/IEventSupplierTransactionAgreementsRepository';
import EventSupplierTransactionAgreementsRepository from '@modules/transactions/infra/typeorm/repositories/EventSupplierTransactionAgreementsRepository';

import IEventSupplierTransactionsRepository from '@modules/transactions/repositories/IEventSupplierTransactionsRepository';
import EventSupplierTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/EventSupplierTransactionsRepository';

import IEventSupplierNotesRepository from '@modules/notes/repositories/IEventSupplierNotesRepository';
import EventSupplierNotesRepository from '@modules/notes/infra/typeorm/repositories/EventSupplierNotesRepository';

import ITransactionNotesRepository from '@modules/notes/repositories/ITransactionNotesRepository';
import TransactionNotesRepository from '@modules/notes/infra/typeorm/repositories/TransactionNotesRepository';

import ITransactionFilesRepository from '@modules/transactions/repositories/ITransactionFilesRepository';
import TransactionFilesRepository from '@modules/transactions/infra/typeorm/repositories/TransactionFilesRepository';

import IEventSupplierFilesRepository from '@modules/suppliers/repositories/IEventSupplierFilesRepository';
import EventSupplierFilesRepository from '@modules/suppliers/infra/typeorm/repositories/EventSupplierFilesRepository';

import IEventSupplierBudgetsRepository from '@modules/suppliers/repositories/IEventSupplierBudgetsRepository';
import EventSupplierBudgetsRepository from '@modules/suppliers/infra/typeorm/repositories/EventSupplierBudgetsRepository';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository';

import ITaskNotesRepository from '@modules/tasks/repositories/ITaskNotesRepository';
import TaskNotesRepository from '@modules/tasks/infra/typeorm/repositories/TaskNotesRepository';

import ITaskFollowersRepository from '@modules/tasks/repositories/ITaskFollowersRepository';
import TaskFollowersRepository from '@modules/tasks/infra/typeorm/repositories/TaskFollowersRepository';

import IEventMemberTransactionAgreementsRepository from '@modules/transactions/repositories/IEventMemberTransactionAgreementsRepository';
import EventMemberTransactionAgreementsRepository from '@modules/transactions/infra/typeorm/repositories/EventMemberTransactionAgreementsRepository';

import IEventMemberTransactionsRepository from '@modules/transactions/repositories/IEventMemberTransactionsRepository';
import EventMemberTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/EventMemberTransactionsRepository';

import IEventOwnerTransactionAgreementsRepository from '@modules/transactions/repositories/IEventOwnerTransactionAgreementsRepository';
import EventOwnerTransactionAgreementsRepository from '@modules/transactions/infra/typeorm/repositories/EventOwnerTransactionAgreementsRepository';

import IEventOwnerTransactionsRepository from '@modules/transactions/repositories/IEventOwnerTransactionsRepository';
import EventOwnerTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/EventOwnerTransactionsRepository';

import IEventOwnerNotesRepository from '@modules/notes/repositories/IEventOwnerNotesRepository';
import EventOwnerNotesRepository from '@modules/notes/infra/typeorm/repositories/EventOwnerNotesRepository';

import IEventMemberNotesRepository from '@modules/notes/repositories/IEventMemberNotesRepository';
import EventMemberNotesRepository from '@modules/notes/infra/typeorm/repositories/EventMemberNotesRepository';

container.registerSingleton<IEventMemberNotesRepository>(
  'EventMemberNotesRepository',
  EventMemberNotesRepository,
);
container.registerSingleton<IEventOwnerNotesRepository>(
  'EventOwnerNotesRepository',
  EventOwnerNotesRepository,
);
container.registerSingleton<IEventOwnerTransactionsRepository>(
  'EventOwnerTransactionsRepository',
  EventOwnerTransactionsRepository,
);
container.registerSingleton<IEventOwnerTransactionAgreementsRepository>(
  'EventOwnerTransactionAgreementsRepository',
  EventOwnerTransactionAgreementsRepository,
);
container.registerSingleton<IEventMemberTransactionsRepository>(
  'EventMemberTransactionsRepository',
  EventMemberTransactionsRepository,
);
container.registerSingleton<IEventMemberTransactionAgreementsRepository>(
  'EventMemberTransactionAgreementsRepository',
  EventMemberTransactionAgreementsRepository,
);
container.registerSingleton<ITaskFollowersRepository>(
  'TaskFollowersRepository',
  TaskFollowersRepository,
);
container.registerSingleton<ITaskNotesRepository>(
  'TaskNotesRepository',
  TaskNotesRepository,
);
container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);
container.registerSingleton<IEventSupplierBudgetsRepository>(
  'EventSupplierBudgetsRepository',
  EventSupplierBudgetsRepository,
);
container.registerSingleton<IEventSupplierFilesRepository>(
  'EventSupplierFilesRepository',
  EventSupplierFilesRepository,
);
container.registerSingleton<ITransactionFilesRepository>(
  'TransactionFilesRepository',
  TransactionFilesRepository,
);
container.registerSingleton<ITransactionNotesRepository>(
  'TransactionNotesRepository',
  TransactionNotesRepository,
);
container.registerSingleton<IEventSupplierNotesRepository>(
  'EventSupplierNotesRepository',
  EventSupplierNotesRepository,
);
container.registerSingleton<IEventSupplierTransactionsRepository>(
  'EventSupplierTransactionsRepository',
  EventSupplierTransactionsRepository,
);
container.registerSingleton<IEventSupplierTransactionAgreementsRepository>(
  'EventSupplierTransactionAgreementsRepository',
  EventSupplierTransactionAgreementsRepository,
);
container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);
container.registerSingleton<IEventBudgetRepository>(
  'EventBudgetRepository',
  EventBudgetRepository,
);
container.registerSingleton<IEventTasksRepository>(
  'EventTasksRepository',
  EventTasksRepository,
);
container.registerSingleton<IGuestContactsRepository>(
  'GuestContactsRepository',
  GuestContactsRepository,
);
container.registerSingleton<IEmployeeCheckListRepository>(
  'EmployeeCheckListRepository',
  EmployeeCheckListRepository,
);
container.registerSingleton<IComercialCardResultsRepository>(
  'ComercialCardResultsRepository',
  ComercialCardResultsRepository,
);
container.registerSingleton<INotesRepository>(
  'NotesRepository',
  NotesRepository,
);
container.registerSingleton<ICheckListTaskNotesRepository>(
  'CheckListTaskNotesRepository',
  CheckListTaskNotesRepository,
);
container.registerSingleton<ICompanyEmployeeContactRepository>(
  'CompanyEmployeeContactRepository',
  CompanyEmployeeContactRepository,
);
container.registerSingleton<IUserGoogleProfilesRepository>(
  'UserGoogleProfilesRepository',
  UserGoogleProfilesRepository,
);
container.registerSingleton<IGoogleProfilesRepository>(
  'GoogleProfilesRepository',
  GoogleProfilesRepository,
);
container.registerSingleton<ICompanyContactNotesRepository>(
  'CompanyContactNotesRepository',
  CompanyContactNotesRepository,
);
container.registerSingleton<IFormLandingPageRepository>(
  'FormLandingPageRepository',
  FormLandingPageRepository,
);
container.registerSingleton<IFormStylesRepository>(
  'FormStylesRepository',
  FormStylesRepository,
);
container.registerSingleton<IFormEmailNotificationRecipientsRepository>(
  'FormEmailNotificationRecipientsRepository',
  FormEmailNotificationRecipientsRepository,
);
container.registerSingleton<IFormEmailNotificationsRepository>(
  'FormEmailNotificationsRepository',
  FormEmailNotificationsRepository,
);
container.registerSingleton<IFormSuccessMessageRepository>(
  'FormSuccessMessageRepository',
  FormSuccessMessageRepository,
);
container.registerSingleton<IContactPageSEORepository>(
  'ContactPageSEORepository',
  ContactPageSEORepository,
);
container.registerSingleton<IContactPageCampaignsRepository>(
  'ContactPageCampaignsRepository',
  ContactPageCampaignsRepository,
);
container.registerSingleton<IContactPageFormsRepository>(
  'ContactPageFormsRepository',
  ContactPageFormsRepository,
);
container.registerSingleton<IFormFieldsRepository>(
  'FormFieldsRepository',
  FormFieldsRepository,
);
container.registerSingleton<IUserFormsRepository>(
  'UserFormsRepository',
  UserFormsRepository,
);
container.registerSingleton<IContactPageLinksRepository>(
  'ContactPageLinksRepository',
  ContactPageLinksRepository,
);
container.registerSingleton<IContactPagePostsRepository>(
  'ContactPagePostsRepository',
  ContactPagePostsRepository,
);
container.registerSingleton<IUserContactPagesRepository>(
  'UserContactPagesRepository',
  UserContactPagesRepository,
);
container.registerSingleton<IAppointmentRemindersRepository>(
  'AppointmentRemindersRepository',
  AppointmentRemindersRepository,
);
container.registerSingleton<IAppointmentFilesRepository>(
  'AppointmentFilesRepository',
  AppointmentFilesRepository,
);
container.registerSingleton<IEventInspirationImagesRepository>(
  'EventInspirationImagesRepository',
  EventInspirationImagesRepository,
);
container.registerSingleton<IInspirationImagesRepository>(
  'InspirationImagesRepository',
  InspirationImagesRepository,
);
container.registerSingleton<ICategoryImagesRepository>(
  'CategoryImagesRepository',
  CategoryImagesRepository,
);
container.registerSingleton<IUserImageCategoriesRepository>(
  'UserImageCategoriesRepository',
  UserImageCategoriesRepository,
);
container.registerSingleton<IEventDateVotesRepository>(
  'EventDateVotesRepository',
  EventDateVotesRepository,
);
container.registerSingleton<IImageParticipantsRepository>(
  'ImageParticipantsRepository',
  ImageParticipantsRepository,
);
container.registerSingleton<IEventImagesRepository>(
  'EventImagesRepository',
  EventImagesRepository,
);
container.registerSingleton<IUserImagesRepository>(
  'UserImagesRepository',
  UserImagesRepository,
);
container.registerSingleton<IEventFilesRepository>(
  'EventFilesRepository',
  EventFilesRepository,
);
container.registerSingleton<IEventDatesRepository>(
  'EventDatesRepository',
  EventDatesRepository,
);
container.registerSingleton<IUserConfirmationFilesRepository>(
  'UserConfirmationFilesRepository',
  UserConfirmationFilesRepository,
);
container.registerSingleton<IGuestContactInfosRepository>(
  'GuestContactInfosRepository',
  GuestContactInfosRepository,
);
container.registerSingleton<IEventNotesRepository>(
  'EventNotesRepository',
  EventNotesRepository,
);
container.registerSingleton<IUserFilesRepository>(
  'UserFilesRepository',
  UserFilesRepository,
);
container.registerSingleton<IUserFileCategoriesRepository>(
  'UserFileCategoriesRepository',
  UserFileCategoriesRepository,
);
container.registerSingleton<ICategoryFilesRepository>(
  'CategoryFilesRepository',
  CategoryFilesRepository,
);
container.registerSingleton<ICardFilesRepository>(
  'CardFilesRepository',
  CardFilesRepository,
);
container.registerSingleton<IContactFilesRepository>(
  'ContactFilesRepository',
  ContactFilesRepository,
);
container.registerSingleton<IBudgetFilesRepository>(
  'BudgetFilesRepository',
  BudgetFilesRepository,
);
container.registerSingleton<IEmployeeFilesRepository>(
  'EmployeeFilesRepository',
  EmployeeFilesRepository,
);
container.registerSingleton<ICardBudgetInstallmentsRepository>(
  'CardBudgetInstallmentsRepository',
  CardBudgetInstallmentsRepository,
);
container.registerSingleton<ICardOutsideParticipantsRepository>(
  'CardOutsideParticipantsRepository',
  CardOutsideParticipantsRepository,
);
container.registerSingleton<ICustomerServiceOrdersRepository>(
  'CustomerServiceOrdersRepository',
  CustomerServiceOrdersRepository,
);
container.registerSingleton<IEventServiceOrdersRepository>(
  'EventServiceOrdersRepository',
  EventServiceOrdersRepository,
);
container.registerSingleton<ICustomerServiceOrderFieldAnswersRepository>(
  'CustomerServiceOrderFieldAnswersRepository',
  CustomerServiceOrderFieldAnswersRepository,
);
container.registerSingleton<ICompanyContactsRepository>(
  'CompanyContactsRepository',
  CompanyContactsRepository,
);
container.registerSingleton<ICompanyDefaultServiceOrderFieldsRepository>(
  'CompanyDefaultServiceOrderFieldsRepository',
  CompanyDefaultServiceOrderFieldsRepository,
);
container.registerSingleton<ICompanyContactInfosRepository>(
  'CompanyContactInfosRepository',
  CompanyContactInfosRepository,
);
container.registerSingleton<ICompanyContactWeplanUsersRepository>(
  'CompanyContactWeplanUsersRepository',
  CompanyContactWeplanUsersRepository,
);
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IAppointmentTypesRepository>(
  'AppointmentTypesRepository',
  AppointmentTypesRepository,
);

container.registerSingleton<INonUserAppointmentGuestsRepository>(
  'NonUserAppointmentGuestsRepository',
  NonUserAppointmentGuestsRepository,
);
container.registerSingleton<IWeplanAppointmentGuestsRepository>(
  'WeplanAppointmentGuestsRepository',
  WeplanAppointmentGuestsRepository,
);
container.registerSingleton<IEventAppointmentsRepository>(
  'EventAppointmentsRepository',
  EventAppointmentsRepository,
);
container.registerSingleton<IStageCardAppointmentsRepository>(
  'StageCardAppointmentsRepository',
  StageCardAppointmentsRepository,
);
container.registerSingleton<ICardNotesRepository>(
  'CardNotesRepository',
  CardNotesRepository,
);
container.registerSingleton<ICardCustomerServiceOrdersRepository>(
  'CardCustomerServiceOrdersRepository',
  CardCustomerServiceOrdersRepository,
);
container.registerSingleton<ICardParticipantsRepository>(
  'CardParticipantsRepository',
  CardParticipantsRepository,
);
container.registerSingleton<ICardCustomersRepository>(
  'CardCustomersRepository',
  CardCustomersRepository,
);
container.registerSingleton<ICardBudgetsRepository>(
  'CardBudgetsRepository',
  CardBudgetsRepository,
);
container.registerSingleton<ICheckListsRepository>(
  'CheckListsRepository',
  CheckListsRepository,
);

container.registerSingleton<ICheckListTasksRepository>(
  'CheckListTasksRepository',
  CheckListTasksRepository,
);

container.registerSingleton<ICardCheckListsRepository>(
  'CardCheckListsRepository',
  CardCheckListsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IWeplanContractOrdersRepository>(
  'WeplanContractOrdersRepository',
  WeplanContractOrdersRepository,
);

container.registerSingleton<IWeplanContractOrderProductsRepository>(
  'WeplanContractOrderProductsRepository',
  WeplanContractOrderProductsRepository,
);

container.registerSingleton<IWeplanProductsRepository>(
  'WeplanProductsRepository',
  WeplanProductsRepository,
);

container.registerSingleton<IWeplanManagementModulesRepository>(
  'WeplanManagementModulesRepository',
  WeplanManagementModulesRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
container.registerSingleton<ICompanyInfoRepository>(
  'CompanyInfoRepository',
  CompanyInfoRepository,
);
container.registerSingleton<ICompanyEmployeesRepository>(
  'CompanyEmployeesRepository',
  CompanyEmployeesRepository,
);
container.registerSingleton<ICompanyFunnelCardInfoFieldsRepository>(
  'CompanyFunnelCardInfoFieldsRepository',
  CompanyFunnelCardInfoFieldsRepository,
);
container.registerSingleton<ICompanyFunnelCardInfosRepository>(
  'CompanyFunnelCardInfosRepository',
  CompanyFunnelCardInfosRepository,
);
container.registerSingleton<IUserConfirmationRepository>(
  'UserConfirmationRepository',
  UserConfirmationRepository,
);
container.registerSingleton<IUserManagementModulesRepository>(
  'UserManagementModulesRepository',
  UserManagementModulesRepository,
);

container.registerSingleton<IPersonInfoRepository>(
  'PersonInfoRepository',
  PersonInfoRepository,
);

container.registerSingleton<IUserBirthdateRepository>(
  'UserBirthdateRepository',
  UserBirthdateRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);

container.registerSingleton<IEventTypesRepository>(
  'EventTypesRepository',
  EventTypesRepository,
);

container.registerSingleton<IEventTypeSuppliersRepository>(
  'EventTypeSuppliersRepository',
  EventTypeSuppliersRepository,
);

container.registerSingleton<IEventSuppliersRepository>(
  'EventSuppliersRepository',
  EventSuppliersRepository,
);

container.registerSingleton<IEventWeplanSuppliersRepository>(
  'EventWeplanSuppliersRepository',
  EventWeplanSuppliersRepository,
);

container.registerSingleton<ISupplierProductRepository>(
  'SupplierProductRepository',
  SupplierProductRepository,
);

container.registerSingleton<ISupplierCategoriesRepository>(
  'SupplierCategoriesRepository',
  SupplierCategoriesRepository,
);

container.registerSingleton<ISupplierSubCategoriesRepository>(
  'SupplierSubCategoriesRepository',
  SupplierSubCategoriesRepository,
);

container.registerSingleton<IUserSupplierCategoriesRepository>(
  'UserSupplierCategoriesRepository',
  UserSupplierCategoriesRepository,
);

container.registerSingleton<IUserCheckListsRepository>(
  'UserCheckListsRepository',
  UserCheckListsRepository,
);

container.registerSingleton<IGuestsRepository>(
  'GuestsRepository',
  GuestsRepository,
);

container.registerSingleton<IWeplanGuestsRepository>(
  'WeplanGuestsRepository',
  WeplanGuestsRepository,
);

container.registerSingleton<IEventPlannersRepository>(
  'EventPlannersRepository',
  EventPlannersRepository,
);

container.registerSingleton<IContactTypesRepository>(
  'ContactTypesRepository',
  ContactTypesRepository,
);

container.registerSingleton<IUserContactInfosRepository>(
  'UserContactInfosRepository',
  UserContactInfosRepository,
);

container.registerSingleton<IEventOwnersRepository>(
  'EventOwnersRepository',
  EventOwnersRepository,
);

container.registerSingleton<IEventMembersRepository>(
  'EventMembersRepository',
  EventMembersRepository,
);

container.registerSingleton<IEventInfosRepository>(
  'EventInfosRepository',
  EventInfosRepository,
);

container.registerSingleton<IFunnelTypesRepository>(
  'FunnelTypesRepository',
  FunnelTypesRepository,
);

container.registerSingleton<IFunnelsRepository>(
  'FunnelsRepository',
  FunnelsRepository,
);

container.registerSingleton<IFunnelStagesRepository>(
  'FunnelStagesRepository',
  FunnelStagesRepository,
);

container.registerSingleton<IStageCardsRepository>(
  'StageCardsRepository',
  StageCardsRepository,
);

container.registerSingleton<IEventCardsRepository>(
  'EventCardsRepository',
  EventCardsRepository,
);

container.registerSingleton<ISupplierWeekDayAppointmentsRepository>(
  'SupplierWeekDayAppointmentsRepository',
  SupplierWeekDayAppointmentsRepository,
);

container.registerSingleton<ISupplierAppointmentDaysOffRepository>(
  'SupplierAppointmentDaysOffRepository',
  SupplierAppointmentDaysOffRepository,
);

container.registerSingleton<ISupplierAppointmentDaySchedulesRepository>(
  'SupplierAppointmentDaySchedulesRepository',
  SupplierAppointmentDaySchedulesRepository,
);

container.registerSingleton<ISupplierAppointmentDayIntervalsRepository>(
  'SupplierAppointmentDayIntervalsRepository',
  SupplierAppointmentDayIntervalsRepository,
);

container.registerSingleton<IUserFriendsRepository>(
  'UserFriendsRepository',
  UserFriendsRepository,
);

container.registerSingleton<ICompanyMasterUsersRepository>(
  'CompanyMasterUsersRepository',
  CompanyMasterUsersRepository,
);
