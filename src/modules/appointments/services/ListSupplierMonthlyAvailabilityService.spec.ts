// import AppError from '@shared/errors/AppError';

import ListSupplierMonthlyAvailabilityService from '@modules/appointments/services/ListSupplierMonthlyAvailabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listSupplierMonthAvailability: ListSupplierMonthlyAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListSupplierMonthlyAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listSupplierMonthAvailability = new ListSupplierMonthlyAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability of suppliers', async () => {
    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    }); // dia 20 as 8 = 1

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 9, 0, 0),
    }); // dia 20 as 9 = 2

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    }); // dia 20 as 10 = 3

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 11, 0, 0),
    }); // dia 20 as 11 = 4

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 12, 0, 0),
    }); // dia 20 as 12 = 5

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 13, 0, 0),
    }); // dia 20 as 13 = 6

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    }); // dia 20 as 14 = 7

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    }); // dia 20 as 15 = 8

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 16, 0, 0),
    }); // dia 20 as 16 = 9

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 17, 0, 0),
    }); // dia 20 as 17 = 10

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier_-d',
      user_id: 'user-id',
      date: new Date(2020, 4, 21, 10, 0, 0),
    }); // dia 21 as 10

    const availability = await listSupplierMonthAvailability.execute({
      supplier_id: 'supplier_-d',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 19, available: true },
      ]),
    );
  });
});
