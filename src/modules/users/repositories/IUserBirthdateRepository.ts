import UserBirthdate from '@modules/users/infra/typeorm/entities/UserBirthdate';
import ICreateUserBirthdateDTO from '@modules/users/dtos/ICreateUserBirthdateDTO';

export default interface IUserBirthdateRepository {
  findByUserId(id: string): Promise<UserBirthdate | undefined>;
  create(data: ICreateUserBirthdateDTO): Promise<UserBirthdate>;
  save(userBirthdate: UserBirthdate): Promise<UserBirthdate>;
}
