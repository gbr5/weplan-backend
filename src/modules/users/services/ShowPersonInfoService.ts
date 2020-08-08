import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPersonInfoRepository from '@modules/users/repositories/IPersonInfoRepository';

import PersonInfo from '@modules/users/infra/typeorm/entities/PersonInfo';

interface IRequest {
  user_id: string;
}
@injectable()
class ShowPersonInfoService {
  constructor(
    @inject('PersonInfoRepository')
    private personInfoRepository: IPersonInfoRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<PersonInfo> {
    const personInfo = await this.personInfoRepository.findByUserId(user_id);

    if (!personInfo) {
      throw new AppError('Person information not found.');
    }

    return personInfo;
  }
}

export default ShowPersonInfoService;
