// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListSupplierAppointmentService from '@modules/appointments/services/ListSupplierAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listSupplierAppointment: ListSupplierAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListSupplierAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listSupplierAppointment = new ListSupplierAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all the appointments of the supplier of a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      supplier_id: 'supplier-id',
      user_id: 'user-id',
      date: new Date(2025, 4, 20, 8, 0, 0),
    }); // dia 20 as 8 = 1

    const appointment2 = await fakeAppointmentsRepository.create({
      supplier_id: 'supplier-id',
      user_id: 'user-id',
      date: new Date(2025, 4, 20, 9, 0, 0),
    }); // dia 20 as 9 = 2

    const appointments = await listSupplierAppointment.execute({
      supplier_id: 'supplier-id',
      day: 20,
      month: 5,
      year: 2025,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
