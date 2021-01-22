import { injectable, inject } from 'tsyringe';

import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';

import PersonInfo from '@modules/users/infra/typeorm/entities/PersonInfo';

interface IRequest {
  first_name: string;
  last_name: string;
}

@injectable()
class FindByFirstAndLastNameService {
  constructor(
    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,
  ) {}

  public async execute({
    first_name,
    last_name,
  }: IRequest): Promise<PersonInfo | undefined> {
    const personInfo = await this.personInfoRepository.findByFirstAndLastName(
      first_name,
      last_name,
    );

    return personInfo;
  }
}

export default FindByFirstAndLastNameService;
