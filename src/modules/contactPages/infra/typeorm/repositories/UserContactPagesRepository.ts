import { getRepository, Repository } from 'typeorm';
import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import ICreateUserContactPageDTO from '@modules/contactPages/dtos/ICreateUserContactPageDTO';
import IFindContactPageByUserIdAndSlugDTO from '@modules/contactPages/dtos/IFindContactPageByUserIdAndSlugDTO';
import IFindContactPageByUserNameAndSlugDTO from '@modules/contactPages/dtos/IFindContactPageByUserNameAndSlugDTO';
import UserContactPage from '../entities/UserContactPage';

class UserContactPagesRepository implements IUserContactPagesRepository {
  private ormRepository: Repository<UserContactPage>;

  constructor() {
    this.ormRepository = getRepository(UserContactPage);
  }

  public async findById(id: string): Promise<UserContactPage | undefined> {
    const findUserContactPage = await this.ormRepository.findOne(id);

    return findUserContactPage;
  }

  public async findByUserIdAndSlug({
    user_id,
    slug,
  }: IFindContactPageByUserIdAndSlugDTO): Promise<UserContactPage | undefined> {
    const findUserContactPage = await this.ormRepository.findOne({
      where: { user_id, slug },
    });

    return findUserContactPage;
  }

  public async findByUserNameAndSlug({
    name,
    slug,
  }: IFindContactPageByUserNameAndSlugDTO): Promise<
    UserContactPage | undefined
  > {
    const findUserContactPage = await this.ormRepository.findOne({
      where: { trimmed_name: name, slug },
    });

    return findUserContactPage;
  }

  public async findByUserId(user_id: string): Promise<UserContactPage[]> {
    const findUserContactPage = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserContactPage;
  }

  public async create(
    data: ICreateUserContactPageDTO,
  ): Promise<UserContactPage> {
    const contactPage = this.ormRepository.create(data);

    await this.ormRepository.save(contactPage);

    return contactPage;
  }

  public async save(contactPage: UserContactPage): Promise<UserContactPage> {
    return this.ormRepository.save(contactPage);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserContactPagesRepository;
