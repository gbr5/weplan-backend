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

import IFriendGroupsRepository from '@modules/users/repositories/IFriendGroupsRepository';
import FriendGroupsRepository from '@modules/users/infra/typeorm/repositories/FriendGroupsRepository';

import IUserFriendsRepository from '@modules/users/repositories/IUserFriendsRepository';
import UserFriendsRepository from '@modules/users/infra/typeorm/repositories/UserFriendsRepository';

import ITransactionAgreementsRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';
import TransactionAgreementsRepository from '@modules/finances/infra/typeorm/repositories/TransactionAgreementsRepository';

import ITransactionsRepository from '@modules/finances/repositories/ITransactionsRepository';
import TransactionsRepository from '@modules/finances/infra/typeorm/repositories/TransactionsRepository';

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

import IEventUserSupplierNotesRepository from '@modules/events/repositories/IEventUserSupplierNotesRepository';
import EventUserSupplierNotesRepository from '@modules/events/infra/typeorm/repositories/EventUserSupplierNotesRepository';

import IMainTransactionsRepository from '@modules/transactions/repositories/IMainTransactionsRepository';
import MainTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/MainTransactionsRepository';

import IEventTransactionsRepository from '@modules/transactions/repositories/IEventTransactionsRepository';
import EventTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/EventTransactionsRepository';

import IUserTransactionsRepository from '@modules/transactions/repositories/IUserTransactionsRepository';
import UserTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/UserTransactionsRepository';

import IEventSupplierMainTransactionsRepository from '@modules/transactions/repositories/IEventSupplierMainTransactionsRepository';
import EventSupplierMainTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/EventSupplierMainTransactionsRepository';

import IEventOwnerPaymentTransactionsRepository from '@modules/transactions/repositories/IEventOwnerPaymentTransactionsRepository';
import EventOwnerPaymentTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/EventOwnerPaymentTransactionsRepository';

import IEventOwnerPaymentsRepository from '@modules/transactions/repositories/IEventOwnerPaymentsRepository';
import EventOwnerPaymentsRepository from '@modules/transactions/infra/typeorm/repositories/EventOwnerPaymentsRepository';

import IEventMemberPaymentTransactionsRepository from '@modules/transactions/repositories/IEventMemberPaymentTransactionsRepository';
import EventMemberPaymentTransactionsRepository from '@modules/transactions/infra/typeorm/repositories/EventMemberPaymentTransactionsRepository';

import IEventMemberPaymentsRepository from '@modules/transactions/repositories/IEventMemberPaymentsRepository';
import EventMemberPaymentsRepository from '@modules/transactions/infra/typeorm/repositories/EventMemberPaymentsRepository';

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

container.registerSingleton<IEventMemberPaymentsRepository>(
  'EventMemberPaymentsRepository',
  EventMemberPaymentsRepository,
);

container.registerSingleton<IEventMemberPaymentTransactionsRepository>(
  'EventMemberPaymentTransactionsRepository',
  EventMemberPaymentTransactionsRepository,
);

container.registerSingleton<IEventOwnerPaymentsRepository>(
  'EventOwnerPaymentsRepository',
  EventOwnerPaymentsRepository,
);

container.registerSingleton<IEventOwnerPaymentTransactionsRepository>(
  'EventOwnerPaymentTransactionsRepository',
  EventOwnerPaymentTransactionsRepository,
);

container.registerSingleton<IEventSupplierMainTransactionsRepository>(
  'EventSupplierMainTransactionsRepository',
  EventSupplierMainTransactionsRepository,
);

container.registerSingleton<IEventTransactionsRepository>(
  'EventTransactionsRepository',
  EventTransactionsRepository,
);

container.registerSingleton<IUserTransactionsRepository>(
  'UserTransactionsRepository',
  UserTransactionsRepository,
);

container.registerSingleton<IMainTransactionsRepository>(
  'MainTransactionsRepository',
  MainTransactionsRepository,
);
container.registerSingleton<IEventUserSupplierNotesRepository>(
  'EventUserSupplierNotesRepository',
  EventUserSupplierNotesRepository,
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

container.registerSingleton<IFriendGroupsRepository>(
  'FriendGroupsRepository',
  FriendGroupsRepository,
);

container.registerSingleton<IUserFriendsRepository>(
  'UserFriendsRepository',
  UserFriendsRepository,
);

container.registerSingleton<ITransactionAgreementsRepository>(
  'TransactionAgreementsRepository',
  TransactionAgreementsRepository,
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository,
);

container.registerSingleton<ICompanyMasterUsersRepository>(
  'CompanyMasterUsersRepository',
  CompanyMasterUsersRepository,
);
