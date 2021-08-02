import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';

@injectable()
class DeleteEventMemberService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkList = await this.eventMembersRepository.findById(id);

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    await this.eventMembersRepository.delete(checkList);
  }
}

export default DeleteEventMemberService;
