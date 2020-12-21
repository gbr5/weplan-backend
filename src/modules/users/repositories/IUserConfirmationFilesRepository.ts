import UserConfirmationFile from '@modules/users/infra/typeorm/entities/UserConfirmationFile';
import ICreateUserConfirmationFileDTO from '@modules/users/dtos/ICreateUserConfirmationFileDTO';

export default interface IUserConfirmationFilesRepository {
  create(data: ICreateUserConfirmationFileDTO): Promise<UserConfirmationFile>;
  findById(id: string): Promise<UserConfirmationFile | undefined>;
  save(supplier: UserConfirmationFile): Promise<UserConfirmationFile>;
  delete(employee: UserConfirmationFile): Promise<void>;
}
