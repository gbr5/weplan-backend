import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  user_id: string;
  event_id: string;
  member_id: string;
  number_of_guests: number;
}

@injectable()
class CreateEventMemberService {
  constructor(
    @inject('EventMembersRepository')
    private membersRepository: IEventMembersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    event_id,
    member_id,
    number_of_guests,
  }: IRequest): Promise<EventMember> {
    const memberExists = await this.membersRepository.findByEventAndMemberId(
      event_id,
      member_id,
    );

    if (memberExists) {
      throw new AppError('The member that you have chosen, already exists.');
    }

    const member = await this.membersRepository.create({
      event_id,
      member_id,
      number_of_guests,
    });

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: 'Cerimonialista adicionado com sucesso.',
    });

    return member;
  }
}

export default CreateEventMemberService;
