import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';

interface IRequest {
  event_id: string;
  owner_id: string;
}
@injectable()
class DeleteEventOwnerService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,
  ) {}

  public async execute({ event_id, owner_id }: IRequest): Promise<void> {
    const checkList = await this.eventOwnersRepository.findByEventAndOwnerId(
      event_id,
      owner_id,
    );

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    await this.eventOwnersRepository.delete(checkList);
  }
}

export default DeleteEventOwnerService;