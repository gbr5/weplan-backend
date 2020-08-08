import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';
import PersonInfo from '@modules/users/infra/typeorm/entities/PersonInfo';

interface IRequest {
  person_id: string;
  user_id: string;
  first_name: string;
  last_name: string;
}

@injectable()
class CreatePersonInfoService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,
  ) {}

  public async execute({
    person_id,
    user_id,
    first_name,
    last_name,
  }: IRequest): Promise<PersonInfo> {
    const checkIfUserExists = await this.usersRepository.findById(user_id);

    if (!checkIfUserExists) {
      throw new AppError('Usernot found!');
    }

    if (checkIfUserExists.isCompany === true) {
      throw new AppError(
        'This user has a company account, therefore, cannot create a person information profile!',
      );
    }

    const checkIfPersonInfoExists = await this.personInfoRepository.findByUserId(
      user_id,
    );

    if (checkIfPersonInfoExists) {
      throw new AppError(
        'This user already have a person information profile!',
      );
    }

    const personInfo = await this.personInfoRepository.create({
      person_id,
      user_id,
      first_name,
      last_name,
    });

    return personInfo;
  }
}

export default CreatePersonInfoService;
