import { getRepository, Repository } from 'typeorm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import ICreateUserFormDTO from '@modules/forms/dtos/ICreateUserFormDTO';
import UserForm from '../entities/UserForm';

class UserFormsRepository implements IUserFormsRepository {
  private ormRepository: Repository<UserForm>;

  constructor() {
    this.ormRepository = getRepository(UserForm);
  }

  public async findById(id: string): Promise<UserForm | undefined> {
    const findUserForm = await this.ormRepository.findOne(id);

    return findUserForm;
  }

  public async findBySlug(slug: string): Promise<UserForm | undefined> {
    const findUserForm = await this.ormRepository.findOne({
      where: { slug },
    });

    return findUserForm;
  }

  public async findByUserId(user_id: string): Promise<UserForm[]> {
    const findUserForm = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserForm;
  }

  public async create(data: ICreateUserFormDTO): Promise<UserForm> {
    const form = this.ormRepository.create(data);

    await this.ormRepository.save(form);

    return form;
  }

  public async save(form: UserForm): Promise<UserForm> {
    return this.ormRepository.save(form);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserFormsRepository;
