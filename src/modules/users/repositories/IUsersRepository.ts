import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllSuppliersDTO from 'modules/users/dtos/IFindAllSuppliersDTO';

export default interface IUsersRepository {
  findAllSuppliers(data: IFindAllSuppliersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findAllUsers(): Promise<User[]>;
  // findByName(user_name: string): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
