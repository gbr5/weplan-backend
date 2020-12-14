import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';

import EventMember from '@modules/events/infra/typeorm/entities/EventMember';

interface IRequest {
  member_id: string;
  number_of_guests: number;
}
@injectable()
class UpdateEventMemberNumberOfGuestsService {
  constructor(
    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,
  ) {}

  public async execute({
    member_id,
    number_of_guests,
  }: IRequest): Promise<EventMember> {
    const eventMember = await this.eventMembersRepository.findById(member_id);

    if (!eventMember) {
      throw new AppError('Event owner not found.');
    }

    eventMember.number_of_guests = number_of_guests;

    const updatedEventMember = await this.eventMembersRepository.save(
      eventMember,
    );

    return updatedEventMember;
  }
}

export default UpdateEventMemberNumberOfGuestsService;
