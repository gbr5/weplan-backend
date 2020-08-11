import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';

interface IRequest {
  event_name: string;
  first_name: string;
  last_name: string;
}
@injectable()
class DeleteGuestService {
  constructor(
    @inject('GuestsRepository')
    private userCheckListsRepository: IGuestsRepository,
  ) {}

  public async execute({
    event_name,
    first_name,
    last_name,
  }: IRequest): Promise<void> {
    const checkList = await this.userCheckListsRepository.findByEventFirstNameAndLastName(
      event_name,
      first_name,
      last_name,
    );

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    await this.userCheckListsRepository.delete(checkList);
  }
}

export default DeleteGuestService;
