import { injectable, inject } from 'tsyringe';
import { addDays } from 'date-fns';

import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import AppError from '@shared/errors/AppError';
import ICreateEventTaskDTO from '../dtos/ICreateEventTaskDTO';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  event_id: string;
}

@injectable()
class CreateWeddingTasksService {
  constructor(
    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ event_id }: IRequest): Promise<void> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const today = new Date();

    const weddingTasks: ICreateEventTaskDTO[] = [
      {
        event_id,
        title: 'Definir o tema (Grama, Praia, Cidade, Igreja)',
        priority: 'high',
        status: 'not started',
        due_date: addDays(today, 3),
      },
      {
        event_id,
        title: 'Definir o Orçamento',
        priority: 'high',
        status: 'not started',
        due_date: addDays(today, 4),
      },
      {
        event_id,
        title: 'Definir o número de pessoas',
        priority: 'neutral',
        status: 'not started',
        due_date: addDays(today, 5),
      },
      {
        event_id,
        title: 'Definir a cidade',
        priority: 'neutral',
        status: 'not started',
        due_date: addDays(today, 6),
      },
      {
        event_id,
        title: 'Definir a data',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 7),
      },
      {
        event_id,
        title: 'Pesquisar cerimoniais de confiança que conheçam o local',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 8),
      },
      {
        event_id,
        title: 'Selecionar o cerimonial',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 9),
      },
      {
        event_id,
        title: 'Pesquisar locais para a cerimônia e recepção',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 10),
      },
      {
        event_id,
        title: 'Pesquisar buffets',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 11),
      },
    ];
    Promise.all([
      weddingTasks.map(task => this.eventTasksRepository.create(task)),
    ]);
  }
}

export default CreateWeddingTasksService;
