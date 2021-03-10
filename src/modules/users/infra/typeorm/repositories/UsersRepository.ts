import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllSuppliersDTO from 'modules/users/dtos/IFindAllSuppliersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByAllById(ids: string[]): Promise<User[]> {
    const users = await this.ormRepository.findByIds(ids);

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: { isCompany: false },
    });

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByTrimmedName(
    trimmed_name: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { trimmed_name },
    });

    return user;
  }

  public async findAllSuppliers({
    except_user_id,
  }: IFindAllSuppliersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete({ id }: User): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default UsersRepository;
