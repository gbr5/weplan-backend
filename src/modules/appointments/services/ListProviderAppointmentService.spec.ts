// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listProviderAppointment: ListProviderAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointment = new ListProviderAppointmentService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all the appointments of the provider of a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2025, 4, 20, 8, 0, 0),
    }); // dia 20 as 8 = 1

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2025, 4, 20, 9, 0, 0),
    }); // dia 20 as 9 = 2

    const appointments = await listProviderAppointment.execute({
      provider_id: 'provider-id',
      day: 20,
      month: 5,
      year: 2025,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
