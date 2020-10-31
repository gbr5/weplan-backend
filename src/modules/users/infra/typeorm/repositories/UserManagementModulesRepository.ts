import { getRepository, Repository } from 'typeorm';

import IUserManagementModuleRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import ICreateUserManagementModuleDTO from '@modules/users/dtos/ICreateUserManagementModuleDTO';

import UserManagementModule from '@modules/users/infra/typeorm/entities/UserManagementModule';
import AppError from '@shared/errors/AppError';

class UserManagementModuleRepository
  implements IUserManagementModuleRepository {
  private ormRepository: Repository<UserManagementModule>;

  constructor() {
    this.ormRepository = getRepository(UserManagementModule);
  }

  public async findByUserId(user_id: string): Promise<UserManagementModule[]> {
    const findUserManagementModule = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserManagementModule;
  }

  public async findById(id: string): Promise<UserManagementModule | undefined> {
    const userModule = await this.ormRepository.findOne(id);

    return userModule;
  }

  public async findAllById(ids: string[]): Promise<UserManagementModule[]> {
    const modules = await this.ormRepository.findByIds(ids);

    return modules;
  }

  public async create(
    data: ICreateUserManagementModuleDTO,
  ): Promise<UserManagementModule> {
    try {
      const userManagementModule = this.ormRepository.create(data);

      await this.ormRepository.save(userManagementModule);

      return userManagementModule;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserManagementModuleRepository.create',
      );
    }
  }

  public async save(
    employee: UserManagementModule,
  ): Promise<UserManagementModule> {
    try {
      return this.ormRepository.save(employee);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserManagementModuleRepository.save',
      );
    }
  }

  public async delete(employee: UserManagementModule): Promise<void> {
    try {
      await this.ormRepository.delete(employee.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserManagementModuleRepository.delete',
      );
    }
  }
}

export default UserManagementModuleRepository;
