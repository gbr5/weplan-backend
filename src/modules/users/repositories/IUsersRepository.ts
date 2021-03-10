import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllSuppliersDTO from 'modules/users/dtos/IFindAllSuppliersDTO';

export default interface IUsersRepository {
  findAllSuppliers(data: IFindAllSuppliersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByAllById(ids: string[]): Promise<User[]>;
  findAllUsers(): Promise<User[]>;
  findByTrimmedName(trimmed_name: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(user: User): Promise<void>;
}
