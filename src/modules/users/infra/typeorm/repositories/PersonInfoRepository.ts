import { getRepository, Repository } from 'typeorm';

import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';
import ICreatePersonInfoDTO from '@modules/users/dtos/ICreatePersonInfoDTO';

import PersonInfo from '@modules/users/infra/typeorm/entities/PersonInfo';

class PersonInfoRepository implements IPersonInfoRepository {
  private ormRepository: Repository<PersonInfo>;

  constructor() {
    this.ormRepository = getRepository(PersonInfo);
  }

  public async findByUserId(id: string): Promise<PersonInfo | undefined> {
    const personInfo = await this.ormRepository.findOne({
      where: { user_id: id },
    });

    return personInfo;
  }

  public async findByPersonId(
    person_id: string,
  ): Promise<PersonInfo | undefined> {
    const personInfo = await this.ormRepository.findOne({
      where: { person_id },
    });

    return personInfo;
  }

  public async create(personData: ICreatePersonInfoDTO): Promise<PersonInfo> {
    const personInfo = this.ormRepository.create(personData);

    await this.ormRepository.save(personInfo);

    return personInfo;
  }

  public async save(personInfo: PersonInfo): Promise<PersonInfo> {
    return this.ormRepository.save(personInfo);
  }
}

export default PersonInfoRepository;
