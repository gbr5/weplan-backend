import ListSupplierDayAvailabilityService from '@modules/appointments/services/ListSupplierDayAvailabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listSupplierDayAvailability: ListSupplierDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListSupplierDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listSupplierDayAvailability = new ListSupplierDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the dayly availability of suppliers', async () => {
    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    }); // dia 20 as 8 = 1

    await fakeAppointmentsRepository.create({
      supplier_id: 'supplier-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    }); // dia 20 as 10 = 3

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listSupplierDayAvailability.execute({
      supplier_id: 'supplier-id',
      year: 2020,
      month: 5,
      day: 20,
    });

    await expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
