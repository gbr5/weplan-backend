import { injectable, inject } from 'tsyringe';
import { addDays } from 'date-fns';

import IEventTasksRepository from '@modules/events/repositories/IEventTasksRepository';
import AppError from '@shared/errors/AppError';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  event_id: string;
  user_id: string;
}

@injectable()
class CreateWeddingTasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ event_id, user_id }: IRequest): Promise<void> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const today = new Date();

    const weddingTasks: ICreateTaskDTO[] = [
      {
        user_id,
        title: 'Definir o tema (Grama, Praia, Cidade, Igreja)',
        priority: 'high',
        status: 'not started',
        due_date: addDays(today, 3),
      },
      {
        user_id,
        title: 'Definir o Orçamento',
        priority: 'high',
        status: 'not started',
        due_date: addDays(today, 4),
      },
      {
        user_id,
        title: 'Definir o número de pessoas',
        priority: 'neutral',
        status: 'not started',
        due_date: addDays(today, 5),
      },
      {
        user_id,
        title: 'Definir a cidade',
        priority: 'neutral',
        status: 'not started',
        due_date: addDays(today, 6),
      },
      {
        user_id,
        title: 'Definir a data',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 7),
      },
      {
        user_id,
        title: 'Pesquisar cerimoniais de confiança que conheçam o local',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 8),
      },
      {
        user_id,
        title: 'Selecionar o cerimonial',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 9),
      },
      {
        user_id,
        title: 'Pesquisar locais para a cerimônia e recepção',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 10),
      },
      {
        user_id,
        title: 'Pesquisar buffets',
        priority: 'low',
        status: 'not started',
        due_date: addDays(today, 11),
      },
    ];
    Promise.all([
      weddingTasks.map(task =>
        this.tasksRepository.create(task).then(response => {
          this.eventTasksRepository.create({
            event_id,
            task_id: response.id,
          });
        }),
      ),
    ]);
  }
}

export default CreateWeddingTasksService;
