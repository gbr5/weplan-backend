import PersonInfo from '@modules/users/infra/typeorm/entities/PersonInfo';
import ICreatePersonInfoDTO from '@modules/users/dtos/ICreatePersonInfoDTO';

export default interface IPersonInfoRepository {
  findByUserId(id: string): Promise<PersonInfo | undefined>;
  create(data: ICreatePersonInfoDTO): Promise<PersonInfo>;
  save(personInfo: PersonInfo): Promise<PersonInfo>;
}