import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IAppointmentDurationsRepository from '@modules/appointments/repositories/IAppointmentDurationsRepository';
import AppointmentDurationsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentDurationsRepository';

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

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import ICompanyInfoRepository from '@modules/users/repositories/ICompanyInfoRepository';
import CompanyInfoRepository from '@modules/users/infra/typeorm/repositories/CompanyInfoRepository';

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

import ISelectedSuppliersRepository from '@modules/events/repositories/ISelectedSuppliersRepository';
import SelectedSuppliersRepository from '@modules/events/infra/typeorm/repositories/SelectedSuppliersRepository';

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

import ISupplierWeekDayAppointmentsRepository from '@modules/appointments/repositories/ISupplierWeekDayAppointmentsRepository';
import SupplierWeekDayAppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/SupplierWeekDayAppointmentsRepository';

import ISupplierAppointmentDaysOffRepository from '@modules/appointments/repositories/ISupplierAppointmentDaysOffRepository';
import SupplierAppointmentDaysOffRepository from '@modules/appointments/infra/typeorm/repositories/SupplierAppointmentDaysOffRepository';

import ISupplierAppointmentDaySchedulesRepository from '@modules/appointments/repositories/ISupplierAppointmentDaySchedulesRepository';
import SupplierAppointmentDaySchedulesRepository from '@modules/appointments/infra/typeorm/repositories/SupplierAppointmentDaySchedulesRepository';

import ISupplierAppointmentDayIntervalsRepository from '@modules/appointments/repositories/ISupplierAppointmentDayIntervalsRepository';
import SupplierAppointmentDayIntervalsRepository from '@modules/appointments/infra/typeorm/repositories/SupplierAppointmentDayIntervalsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IAppointmentDurationsRepository>(
  'AppointmentDurationsRepository',
  AppointmentDurationsRepository,
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
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
container.registerSingleton<ICompanyInfoRepository>(
  'CompanyInfoRepository',
  CompanyInfoRepository,
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

container.registerSingleton<ISelectedSuppliersRepository>(
  'SelectedSuppliersRepository',
  SelectedSuppliersRepository,
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
