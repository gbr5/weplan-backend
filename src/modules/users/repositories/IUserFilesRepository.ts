import UserFile from '@modules/users/infra/typeorm/entities/UserFile';

interface ICreateUserFile {
  user_id: string;
  file_name: string;
  description: string;
  url: string;
}

export default interface IUserFilesRepository {
  create(data: ICreateUserFile): Promise<UserFile>;
  findByUserId(user_id: string): Promise<UserFile[]>;
  findByUserIdAndFileName(
    user_id: string,
    file_name: string,
  ): Promise<UserFile | undefined>;
  findById(id: string): Promise<UserFile | undefined>;
  save(data: UserFile): Promise<UserFile>;
  delete(data: UserFile): Promise<void>;
}
