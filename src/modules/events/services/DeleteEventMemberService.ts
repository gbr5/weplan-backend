import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';

interface IRequest {
  event_id: string;
  member_id: string;
}
@injectable()
class DeleteEventMemberService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,
  ) {}

  public async execute({ event_id, member_id }: IRequest): Promise<void> {
    const checkList = await this.eventMembersRepository.findByEventAndMemberId(
      event_id,
      member_id,
    );

    if (!checkList) {
      throw new AppError('Selected supplier not found.');
    }

    await this.eventMembersRepository.delete(checkList);
  }
}

export default DeleteEventMemberService;