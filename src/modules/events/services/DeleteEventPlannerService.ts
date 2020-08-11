import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventPlannersRepository from '@modules/events/repositories/IEventPlannersRepository';

interface IRequest {
  event_name: string;
  planner_id: string;
}
@injectable()
class DeleteEventPlannerService {
  constructor(
    @inject('EventPlannersRepository')
    private eventPlannersRepository: IEventPlannersRepository,
  ) {}

  public async execute({ event_name, planner_id }: IRequest): Promise<void> {
    const checkList = await this.eventPlannersRepository.findByEventAndPlannerId(
      event_name,
      planner_id,
    );

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    await this.eventPlannersRepository.delete(checkList);
  }
}

export default DeleteEventPlannerService;
