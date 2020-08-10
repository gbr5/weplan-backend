import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

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

import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import EventSuppliersRepository from '@modules/events/infra/typeorm/repositories/EventSuppliersRepository';

import ISupplierCategoriesRepository from '@modules/suppliers/repositories/ISupplierCategoriesRepository';
import SupplierCategoriesRepository from '@modules/suppliers/infra/typeorm/repositories/SupplierCategoriesRepository';

import ISupplierSubCategoriesRepository from '@modules/suppliers/repositories/ISupplierSubCategoriesRepository';
import SupplierSubCategoriesRepository from '@modules/suppliers/infra/typeorm/repositories/SupplierSubCategoriesRepository';

import IUserSupplierCategoriesRepository from '@modules/suppliers/repositories/IUserSupplierCategoriesRepository';
import UserSupplierCategoriesRepository from '@modules/suppliers/infra/typeorm/repositories/UserSupplierCategoriesRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
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

container.registerSingleton<IEventSuppliersRepository>(
  'EventSuppliersRepository',
  EventSuppliersRepository,
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
