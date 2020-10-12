import { getRepository, Repository } from 'typeorm';

import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import ICreateEventMemberDTO from '@modules/events/dtos/ICreateEventMemberDTO';
import EventMember from '@modules/events/infra/typeorm/entities/EventMember';

class EventMemberRepository implements IEventMembersRepository {
  private ormRepository: Repository<EventMember>;

  constructor() {
    this.ormRepository = getRepository(EventMember);
  }

  public async findByEventAndMemberId(
    event_id: string,
    member_id: string,
  ): Promise<EventMember | undefined> {
    const member = await this.ormRepository.findOne({
      where: { event_id, member_id },
    });
    return member;
  }

  public async findByEvent(event_id: string): Promise<EventMember[]> {
    const members = await this.ormRepository.find({
      where: { event_id },
    });

    return members;
  }

  public async findByMemberId(member_id: string): Promise<EventMember[]> {
    const member = await this.ormRepository.find({
      where: { member_id },
    });

    return member;
  }

  public async findById(id: string): Promise<EventMember | undefined> {
    const event = await this.ormRepository.findOne(id);

    return event;
  }

  public async create({
    event_id,
    member_id,
    number_of_guests,
  }: ICreateEventMemberDTO): Promise<EventMember> {
    const member = this.ormRepository.create({
      event_id,
      member_id,
      number_of_guests,
    });

    await this.ormRepository.save(member);

    return member;
  }

  public async save(member: EventMember): Promise<EventMember> {
    return this.ormRepository.save(member);
  }

  public async delete({ event_id, member_id }: EventMember): Promise<void> {
    await this.ormRepository.delete({
      event_id,
      member_id,
    });
  }
}

export default EventMemberRepository;
