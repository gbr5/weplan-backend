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

  public async execute(id: string): Promise<void> {
    const owner = await this.eventOwnersRepository.findById(id);

    if (!owner) {
      throw new AppError('Selected supplier not found.');
    }

    await this.eventOwnersRepository.delete(owner);
  }
}

export default DeleteEventOwnerService;
