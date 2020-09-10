import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';

import EventMember from '@modules/events/infra/typeorm/entities/EventMember';

@injectable()
class UpdateEventMemberService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,
  ) {}

  public async execute(
    id: string,
    number_of_guests: number,
  ): Promise<EventMember> {
    const eventMember = await this.eventMembersRepository.findById(id);

    if (!eventMember) {
      throw new AppError('Event informations not found.');
    }

    eventMember.number_of_guests = number_of_guests;

    const updatedEventMember = await this.eventMembersRepository.save(
      eventMember,
    );

    return updatedEventMember;
  }
}

export default UpdateEventMemberService;
