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
    event_name: string,
    member_id: string,
  ): Promise<EventMember | undefined> {
    const findEventMember = await this.ormRepository.findOne({
      where: { event_name, member_id },
    });

    return findEventMember;
  }

  public async findByEvent(event_name: string): Promise<EventMember[]> {
    const findEventMember = await this.ormRepository.find({
      where: { event_name },
    });

    return findEventMember;
  }

  public async create({
    event_name,
    member_id,
  }: ICreateEventMemberDTO): Promise<EventMember> {
    const member = this.ormRepository.create({
      event_name,
      member_id,
    });

    await this.ormRepository.save(member);

    return member;
  }

  public async save(member: EventMember): Promise<EventMember> {
    return this.ormRepository.save(member);
  }

  public async delete({ event_name, member_id }: EventMember): Promise<void> {
    await this.ormRepository.delete({
      event_name,
      member_id,
    });
  }
}

export default EventMemberRepository;
