import UserManagementModule from '@modules/users/infra/typeorm/entities/UserManagementModule';
import ICreateUserManagementModuleDTO from '@modules/users/dtos/ICreateUserManagementModuleDTO';

export default interface IUserManagementModulesRepository {
  create(data: ICreateUserManagementModuleDTO): Promise<UserManagementModule>;
  findByUserId(user_id: string): Promise<UserManagementModule[]>;
  findAllById(ids: string[]): Promise<UserManagementModule[]>;
  findById(id: string): Promise<UserManagementModule | undefined>;
  save(supplier: UserManagementModule): Promise<UserManagementModule>;
  delete(employee: UserManagementModule): Promise<void>;
}
