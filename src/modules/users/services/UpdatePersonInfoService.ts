import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';

import PersonInfo from '@modules/users/infra/typeorm/entities/PersonInfo';

interface IRequest {
  person_id: string;
  user_id: string;
  first_name: string;
  last_name: string;
}
@injectable()
class UpdatePersonInfoService {
  constructor(
    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,
  ) {}

  public async execute({
    person_id,
    user_id,
    first_name,
    last_name,
  }: IRequest): Promise<PersonInfo> {
    const person_info = await this.personInfoRepository.findByUserId(user_id);

    if (!person_info) {
      throw new AppError('Person information not found.');
    }
    const personID = await this.personInfoRepository.findByPersonId(person_id);

    if (personID && personID.user_id !== person_info.user_id) {
      throw new AppError(
        'This person ID is already associated to another user.',
      );
    }

    person_info.person_id = person_id;
    person_info.first_name = first_name;
    person_info.last_name = last_name;

    const updatedPerson_info = await this.personInfoRepository.save(
      person_info,
    );

    return updatedPerson_info;
  }
}

export default UpdatePersonInfoService;
